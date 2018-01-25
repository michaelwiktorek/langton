import { Coordinate } from "./Coordinate";
import { GridSquareColor } from "./GridSquareColor";

export interface DrawingDatum {
    position: Coordinate;
    color: GridSquareColor;
}
