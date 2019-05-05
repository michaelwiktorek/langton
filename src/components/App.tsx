import * as React from "react";
import { Direction } from "../models/Direction";
import "./App.scss";
import { CanvasRenderer, CanvasRendererProps } from "./game/CanvasRenderer";

const COOL_RULES: { [index: string]: string } = {
    triangle: "RRLLLRLLLRRR",
    langton: "RL",
    chaos: "RLR",
    symmetry: "LLRR",
    square: "LRRRRRLLR",
    convolutedHighway: "LLRRRLRLRLLR"
};

const height = 700;
const width = 1000;

export class App extends React.Component<{}, CanvasRendererProps> {
    constructor(props: React.Props<{}>) {
        super(props);
        this.state = {
            squareSize: 1,
            gridHeight: height,
            gridWidth: width,
            rules: COOL_RULES["square"],
            initialBug: {
                position: { x: width / 2, y: height / 2 },
                direction: Direction.NORTH
            },
            bufferLength: 10000,
            canvasBackground: "black",
            canvasLines: "black",
            drawWithLines: false
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
