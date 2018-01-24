import * as React from "react";
import { Direction } from "../../models/Direction";
import { Game } from "../../models/Game";
import { GameState } from "../../models/GameState";
import { newGrid } from "../../models/Grid";
import { turnSequenceToRuleSet } from "../../models/RuleSet";
import { CSS_COLOR_NAMES } from "../../utils/ColorNames";

const CANVAS_MULTIPLIER = 2;

const GRID_SIZE = 512;

export class CanvasComponent extends React.Component {
    gameState: GameState = {
        grid: newGrid(GRID_SIZE),
        bug: {
            position: { x: GRID_SIZE / 2, y: GRID_SIZE / 2 },
            direction: Direction.NORTH
        }
    };

    game: Game = new Game(turnSequenceToRuleSet("RRLLLRLLLRRR"));

    componentDidMount() {
        this.initializeCanvas();
    }

    timerId = 0;

    private initializeCanvas() {
        const size = this.gameState.grid.data.length;
        const ctx = (this.refs.canvas as any).getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, size * CANVAS_MULTIPLIER, size * CANVAS_MULTIPLIER);
    }

    private updateCanvas() {
        const ctx = (this.refs.canvas as any).getContext("2d");
        const drawingDatum = this.game.mutableTick(this.gameState);
        ctx.fillStyle = CSS_COLOR_NAMES[drawingDatum.color + 30];
        ctx.fillRect(
            drawingDatum.position.x * CANVAS_MULTIPLIER,
            GRID_SIZE * CANVAS_MULTIPLIER -
                drawingDatum.position.y * CANVAS_MULTIPLIER,
            CANVAS_MULTIPLIER,
            CANVAS_MULTIPLIER
        );
    }

    private handleTick = () => {
        this.updateCanvas();
    };
    private handlePlay = () => {
        this.timerId = window.setInterval(this.handleTick, 1);
    };
    private handleStop = () => {
        clearInterval(this.timerId);
    };

    render() {
        return (
            <div>
                <canvas
                    ref="canvas"
                    width={GRID_SIZE * CANVAS_MULTIPLIER}
                    height={GRID_SIZE * CANVAS_MULTIPLIER}
                />
                <div className="button" onClick={this.handleTick}>
                    Single Tick
                </div>
                <div className="button" onClick={this.handlePlay}>
                    Play
                </div>
                <div className="button" onClick={this.handleStop}>
                    Stop
                </div>
            </div>
        );
    }
}
