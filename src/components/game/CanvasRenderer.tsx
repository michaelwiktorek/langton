import * as React from "react";
import { Bug, copyBug } from "../../models/Bug";
import { Game } from "../../models/Game";
import { GameState } from "../../models/GameState";
import { newGrid, getSquare } from "../../models/Grid";
import { turnSequenceToRuleSet } from "../../models/RuleSet";
import { numberToColor } from "../../utils/ColorNames";

export interface CanvasRendererProps {
    canvasMultiplier: number;
    gridSize: number;
    rules: string;
    initialBug: Bug;
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

    private initializeCanvas() {
        const size = this.gameState.grid.data.length;
        const ctx = (this.refs.canvas as any).getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(
            0,
            0,
            size * this.props.canvasMultiplier,
            size * this.props.canvasMultiplier
        );
    }

    private updateCanvas() {
        const ctx = (this.refs.canvas as any).getContext("2d");
        const drawingDatum = this.game.mutableTick(this.gameState);
        ctx.fillStyle = numberToColor(drawingDatum.color);
        ctx.fillRect(
            drawingDatum.position.x * this.props.canvasMultiplier,
            this.props.gridSize * this.props.canvasMultiplier -
                drawingDatum.position.y * this.props.canvasMultiplier,
            this.props.canvasMultiplier,
            this.props.canvasMultiplier
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
        const ctx = (this.refs.canvas as any).getContext("2d");
        const size = state.grid.data.length;
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
        this.timerId = window.setInterval(this.handleTick, 50);
    };
    private handleBuffer = () => {
        this.bufferCanvasUpdates(1000);
    };
    private handlePlayBuffer = () => {
        this.bufferedTimerId = window.setInterval(this.handleBuffer, 50);
    };
    private handleStop = () => {
        clearInterval(this.bufferedTimerId);
        clearInterval(this.timerId);
    };

    render() {
        return (
            <div>
                <canvas
                    ref="canvas"
                    width={this.props.gridSize * this.props.canvasMultiplier}
                    height={this.props.gridSize * this.props.canvasMultiplier}
                />
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
        );
    }
}
