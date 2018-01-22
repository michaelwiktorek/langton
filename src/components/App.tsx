import * as React from "react";
import { Rotation, Direction } from "../models/Direction";
import { Game } from "../models/Game";
import { RuleSet } from "../models/RuleSet";
import { GameState } from "../models/GameState";
import { Grid } from "../models/Grid";

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
                    grid: new Grid(100),
                    bug: {
                        position: { x: 50, y: 50 },
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
        const position = this.getLatestState().bug.position;
        return (
            <div>
                <div>
                    x: {position.x}, y: {position.y}
                </div>
                <div onClick={this.handleUpdate}>click me to update</div>
            </div>
        );
    }
}
