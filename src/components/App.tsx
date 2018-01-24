import * as React from "react";
import { Rotation, Direction } from "../models/Direction";
import { Game } from "../models/Game";
import { RuleSet } from "../models/RuleSet";
import { GameState } from "../models/GameState";
import { Grid } from "../models/Grid";
import * as classnames from "classnames";
import "./App.scss";
import { Bug } from "../models/Bug";
import * as Icon from "react-feather";

export interface AppState {
    game: Game;
    history: GameState[];
    running: boolean;
}

export class App extends React.Component<{}, AppState> {
    constructor(props: React.Props<{}>) {
        super(props);
        const rules: RuleSet = {
            0: { color: 1, rotation: Rotation.CLOCKWISE },
            1: { color: 0, rotation: Rotation.COUNTER_CLOCKWISE }
        };
        this.state = {
            game: new Game(rules),
            history: [
                {
                    grid: new Grid(50),
                    bug: {
                        position: { x: 25, y: 25 },
                        direction: Direction.NORTH
                    }
                }
            ],
            running: false
        };
    }

    private startUpdates = () => {
        //this.setState({ running: true });
        setInterval(this.handleUpdate, 25);
    };

    private stopUpdates = () => {
        //this.setState({ running: false });
    };

    private handleUpdate = () => {
        const newState = this.state.game.tick(this.getLatestState());
        this.setState(state => ({
            history: state.history.concat([newState])
        }));
    };

    private getLatestState = () => {
        const history = this.state.history;
        return history[history.length - 1];
    };

    public renderGameState = (state: GameState) => {
        const size = state.grid.getSize;
        const position = state.bug.position;
        const output: React.ReactNode[][] = [];
        for (let i = size - 1; i >= 0; i--) {
            const row: React.ReactNode[] = [];
            for (let j = 0; j < size; j++) {
                row.push(
                    <div
                        key={`${i}-${j}`}
                        className={classnames(
                            "color-" + state.grid.getSquare({ x: j, y: i }),
                            "grid-cell"
                        )}
                    >
                        {position.x === j &&
                            position.y === i &&
                            this.renderBug(state.bug)}
                    </div>
                );
            }
            output.push(row);
        }
        return output;
    };

    private renderBug = (bug: Bug) => {
        const direction = bug.direction;
        switch (direction) {
            case Direction.NORTH:
                return <Icon.ChevronUp size={12} color={"white"} />;
            case Direction.EAST:
                return <Icon.ChevronRight size={12} color={"white"} />;
            case Direction.SOUTH:
                return <Icon.ChevronDown size={12} color={"white"} />;
            case Direction.WEST:
                return <Icon.ChevronLeft size={12} color={"white"} />;
        }
    };

    render() {
        const currentState = this.getLatestState();
        const map = this.renderGameState(currentState);
        return (
            <div className="app-container">
                <div className="map-container">
                    {map.map((row, index) => {
                        return (
                            <div key={`row${index}`} className="row">
                                {row.map((cell, index) => {
                                    return cell;
                                })}
                            </div>
                        );
                    })}
                </div>
                <div className="button" onClick={this.handleUpdate}>
                    Single Tick
                </div>
                <div className="button" onClick={this.startUpdates}>
                    Play
                </div>
                <div className="button" onClick={this.stopUpdates}>
                    Stop
                </div>
            </div>
        );
    }
}
