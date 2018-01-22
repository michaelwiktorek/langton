import { GridSquareColor } from "./GridSquareColor";
import { Rotation } from "./Direction";

export interface RuleSet {
    [index: number]: Move;
}

export interface Move {
    color: GridSquareColor;
    rotation: Rotation;
}
