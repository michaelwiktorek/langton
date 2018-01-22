import { GridSquareColor } from "./GridSquareColor";

export class GridSquare {
    constructor(private readonly state: GridSquareColor) {}

    get getColor() {
        return this.state;
    }

    public copyWithColor(state: GridSquareColor) {
        return new GridSquare(state);
    }
}
