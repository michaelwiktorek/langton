import * as React from "react";
import "./App.scss";
import { CanvasRenderer } from "./game/CanvasRenderer";
import { Bug } from "../models/Bug";
import { Direction } from "../models/Direction";

export interface AppState {
    canvasMultiplier: number;
    gridSize: number;
    rules: string;
    initialBug: Bug;
}

const COOL_RULES: { [index: string]: string } = {
    triangle: "RRLLLRLLLRRR",
    langton: "RL"
};

export class App extends React.Component<{}, AppState> {
    constructor(props: React.Props<{}>) {
        super(props);
        this.state = {
            canvasMultiplier: 3,
            gridSize: 256,
            rules: COOL_RULES["triangle"],
            initialBug: {
                position: { x: 170, y: 215 },
                direction: Direction.NORTH
            }
        };
    }

    render() {
        const { canvasMultiplier, gridSize, rules, initialBug } = this.state;
        return (
            <div className="app-container">
                <CanvasRenderer
                    canvasMultiplier={canvasMultiplier}
                    gridSize={gridSize}
                    rules={rules}
                    initialBug={initialBug}
                />
            </div>
        );
    }
}
