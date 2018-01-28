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
    bufferLength: number;
}

const COOL_RULES: { [index: string]: string } = {
    triangle: "RRLLLRLLLRRR",
    langton: "RL",
    chaos: "RLR",
    symmetry: "LLRR",
    square: "LRRRRRLLR",
    convolutedHighway: "LLRRRLRLRLLR"
};

export class App extends React.Component<{}, AppState> {
    constructor(props: React.Props<{}>) {
        super(props);
        this.state = {
            canvasMultiplier: 10,
            gridSize: 128,
            rules: COOL_RULES["square"],
            initialBug: {
                position: { x: 64, y: 64 },
                direction: Direction.NORTH
            },
            bufferLength: 100
        };
    }

    render() {
        return (
            <div className="app-container">
                <CanvasRenderer {...this.state} />
            </div>
        );
    }
}
