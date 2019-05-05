import * as React from "react";
import { Bug, copyBug } from "../../models/Bug";
import { Coordinate } from "../../models/Coordinate";
import { Game } from "../../models/Game";
import { GameState } from "../../models/GameState";
import {
    getSquare,
    Grid,
    GridSquare,
    mutate_setSquare,
    newGrid
} from "../../models/Grid";
import { turnSequenceToRuleSet } from "../../models/RuleSet";
import { numberToColor } from "../../utils/ColorNames";
import "./CanvasRenderer.scss";

export interface CanvasRendererProps {
    squareSize: number;
    gridHeight: number;
    gridWidth: number;
    rules: string;
    initialBug: Bug;
    bufferLength: number;
    canvasBackground: string;
    canvasLines: string;
    drawWithLines: boolean;
}

export class CanvasRenderer extends React.Component<CanvasRendererProps> {
    private gameState: GameState;
    private game: Game;
    private timerId: number | null;
    private bufferedTimerId: number | null;
    private canvas: HTMLCanvasElement;

    constructor(props: CanvasRendererProps) {
        super(props);
        this.gameState = {
            grid: newGrid(props.gridHeight, props.gridWidth),
            bug: copyBug(props.initialBug)
        };
        this.game = new Game(turnSequenceToRuleSet(props.rules));
    }

    componentDidMount() {
        this.initializeCanvas();
    }

    private getCtx = (): CanvasRenderingContext2D => {
        return this.canvas.getContext("2d")!;
    };

    private renderGridLines = () => {
        const ctx = this.getCtx();
        ctx.strokeStyle = this.props.canvasLines;
        for (let i = 0; i < this.props.gridWidth + 1; i++) {
            ctx.moveTo(i * this.props.squareSize + 0.5, 0);
            ctx.lineTo(
                i * this.props.squareSize + 0.5,
                this.props.gridWidth * this.props.squareSize + 1
            );
        }
        for (let i = 0; i < this.props.gridHeight + 1; i++) {
            ctx.moveTo(0, i * this.props.squareSize + 0.5);
            ctx.lineTo(
                this.props.gridHeight * this.props.squareSize,
                i * this.props.squareSize + 0.5
            );
        }
        ctx.stroke();
    };

    private initializeCanvas = () => {
        const height = this.props.gridHeight;
        const width = this.props.gridWidth;
        const ctx = this.getCtx();
        ctx.fillStyle = this.props.canvasBackground;
        ctx.fillRect(
            0,
            0,
            width * this.props.squareSize,
            height * this.props.squareSize
        );
        this.renderGridLines();
    };

    private updateCanvas() {
        const ctx = this.getCtx();
        try {
            const square = this.game.mutableTick(this.gameState);
            this.renderSquare(
                ctx,
                square.position,
                square.square,
                this.gameState.grid
            );
        } catch (e) {
            console.error(e);
            this.handleStop();
        }
    }

    private renderSquare(
        ctx: CanvasRenderingContext2D,
        pos: Coordinate,
        square: GridSquare,
        grid: Grid
    ) {
        // only render unrendered squares
        if (square.rendered) {
            return;
        }
        const line = this.props.drawWithLines ? 1 : 0;
        const squareSize = this.props.squareSize;
        const gridHeight = this.props.gridHeight;
        ctx.fillStyle = numberToColor(square.color);
        const x = pos.x * squareSize + line;
        const y = squareSize * gridHeight - pos.y * squareSize + line;
        const width = squareSize - line;
        const height = squareSize - line;
        ctx.fillRect(x, y, width, height);
        mutate_setSquare(grid, pos, { color: square.color, rendered: true });
    }

    private bufferCanvasUpdates(ticks: number) {
        if (ticks === 0) {
            return;
        }
        try {
            for (let i = 0; i < ticks; i++) {
                this.game.mutableTick(this.gameState);
            }
            this.renderEntireGrid(this.gameState);
        } catch (e) {
            console.error(e);
            this.handleStop();
        }
    }

    private renderEntireGrid = (state: GameState) => {
        const ctx = this.getCtx();
        const height = this.props.gridHeight;
        const width = this.props.gridWidth;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                try {
                    const square = getSquare(state.grid, { x, y });
                    this.renderSquare(ctx, { x, y }, square, state.grid);
                } catch (e) {
                    console.error(e);
                    this.handleStop();
                }
            }
        }
    };

    private handleTick = () => {
        this.updateCanvas();
    };
    private handlePlay = () => {
        if (this.timerId == null && this.bufferedTimerId == null) {
            this.timerId = window.setInterval(this.handleTick, 50);
        }
    };
    private handleBuffer = () => {
        this.bufferCanvasUpdates(this.props.bufferLength);
    };
    private handlePlayBuffer = () => {
        if (this.timerId == null && this.bufferedTimerId == null) {
            this.bufferedTimerId = window.setInterval(this.handleBuffer, 50);
        }
    };
    private handleStop = () => {
        if (this.bufferedTimerId != null) {
            clearInterval(this.bufferedTimerId);
            this.bufferedTimerId = null;
        }
        if (this.timerId != null) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    };

    render() {
        return (
            <div className="renderer-container">
                <div className="controls-container">
                    <div className="button" onClick={this.handleTick}>
                        Single Tick
                    </div>
                    <div className="button" onClick={this.handlePlay}>
                        Play
                    </div>
                    <div className="button" onClick={this.handleBuffer}>
                        Single Buffered Tick
                    </div>
                    <div className="button" onClick={this.handlePlayBuffer}>
                        Play Buffered
                    </div>
                    <div className="button" onClick={this.handleStop}>
                        Stop
                    </div>
                </div>
                <canvas
                    ref={el => (this.canvas = el!)}
                    width={this.props.gridWidth * this.props.squareSize + 1}
                    height={this.props.gridHeight * this.props.squareSize + 1}
                />
            </div>
        );
    }
}
