import * as React from "react";
import { Bug, copyBug } from "../../models/Bug";
import { Game } from "../../models/Game";
import { GameState } from "../../models/GameState";
import { newGrid, getSquare } from "../../models/Grid";
import { turnSequenceToRuleSet } from "../../models/RuleSet";
import { numberToColor } from "../../utils/ColorNames";
import "./CanvasRenderer.scss";

export interface CanvasRendererProps {
    canvasMultiplier: number;
    gridSize: number;
    rules: string;
    initialBug: Bug;
    bufferLength: number;
}

export class CanvasRenderer extends React.Component<CanvasRendererProps> {
    private gameState: GameState;
    private game: Game;
    private timerId: number;
    private bufferedTimerId: number;

    constructor(props: CanvasRendererProps) {
        super(props);
        this.gameState = {
            grid: newGrid(props.gridSize),
            bug: copyBug(props.initialBug)
        };
        this.game = new Game(turnSequenceToRuleSet(props.rules));
        this.timerId = 0;
        this.bufferedTimerId = 0;
    }

    componentDidMount() {
        this.initializeCanvas();
    }

    private getCanvas = (): CanvasRenderingContext2D => {
        return (this.refs.canvas as HTMLCanvasElement).getContext("2d")!;
    };

    private renderGridLines = () => {
        const ctx = this.getCanvas();
        ctx.strokeStyle = "black";
        // ctx.lineWidth = 1;
        for (let i = 0; i < this.props.gridSize + 1; i++) {
            ctx.moveTo(i * this.props.canvasMultiplier + 0.5, 0);
            ctx.lineTo(
                i * this.props.canvasMultiplier + 0.5,
                this.props.gridSize * this.props.canvasMultiplier + 1
            );
        }
        for (let i = 0; i < this.props.gridSize + 1; i++) {
            ctx.moveTo(0, i * this.props.canvasMultiplier + 0.5);
            ctx.lineTo(
                this.props.gridSize * this.props.canvasMultiplier,
                i * this.props.canvasMultiplier + 0.5
            );
        }
        ctx.stroke();
    };

    private initializeCanvas = () => {
        const size = this.props.gridSize;
        const ctx = this.getCanvas();
        ctx.fillStyle = "white";
        ctx.fillRect(
            0,
            0,
            size * this.props.canvasMultiplier,
            size * this.props.canvasMultiplier
        );
        this.renderGridLines();
    };

    private updateCanvas() {
        const ctx = this.getCanvas();
        const drawingDatum = this.game.mutableTick(this.gameState);
        ctx.fillStyle = numberToColor(drawingDatum.color);
        ctx.fillRect(
            drawingDatum.position.x * this.props.canvasMultiplier + 1,
            this.props.gridSize * this.props.canvasMultiplier -
                drawingDatum.position.y * this.props.canvasMultiplier +
                1,
            this.props.canvasMultiplier - 1,
            this.props.canvasMultiplier - 1
        );
    }

    private bufferCanvasUpdates(ticks: number) {
        if (ticks === 0) {
            return;
        }
        for (let i = 0; i < ticks; i++) {
            this.game.mutableTick(this.gameState);
        }
        this.renderEntireGrid(this.gameState);
    }

    private renderEntireGrid = (state: GameState) => {
        const ctx = this.getCanvas();
        const size = this.props.gridSize;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                ctx.fillStyle = numberToColor(
                    getSquare(state.grid, { x: j, y: i })
                );
                ctx.fillRect(
                    j * this.props.canvasMultiplier,
                    size * this.props.canvasMultiplier -
                        i * this.props.canvasMultiplier,
                    this.props.canvasMultiplier,
                    this.props.canvasMultiplier
                );
            }
        }
    };

    private handleTick = () => {
        this.updateCanvas();
    };
    private handlePlay = () => {
        if (this.timerId === 0) {
            this.timerId = window.setInterval(this.handleTick, 50);
        }
    };
    private handleBuffer = () => {
        this.bufferCanvasUpdates(this.props.bufferLength);
    };
    private handlePlayBuffer = () => {
        if (this.bufferedTimerId === 0) {
            this.bufferedTimerId = window.setInterval(this.handleBuffer, 50);
        }
    };
    private handleStop = () => {
        clearInterval(this.bufferedTimerId);
        clearInterval(this.timerId);
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
                    ref="canvas"
                    width={
                        this.props.gridSize * this.props.canvasMultiplier + 1
                    }
                    height={
                        this.props.gridSize * this.props.canvasMultiplier + 1
                    }
                />
            </div>
        );
    }
}
