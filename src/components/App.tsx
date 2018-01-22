import * as React from "react";
import { Rotation, Direction } from "../models/Direction";
import { Game } from "../models/Game";
import { RuleSet } from "../models/RuleSet";
import { GameState } from "../models/GameState";
import { Grid } from "../models/Grid";
import "./App.scss";

export interface AppState {
    game: Game;
    history: GameState[];
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
            ]
        };
    }

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

    render() {
        const currentState = this.getLatestState();
        const position = currentState.bug.position;
        const map = this.state.game.renderGameState(currentState);
        return (
            <div className="app-container">
                <div>
                    x: {position.x}, y: {position.y}
                </div>
                <div>
                    {map.map((line, index) => {
                        return (
                            <span className="line-span" key={index}>
                                {line}
                            </span>
                        );
                    })}
                </div>
                <div className="tick-button" onClick={this.handleUpdate}>
                    click me to update
                </div>
            </div>
        );
    }
}
