import { GridSquare } from "./GridSquare";
import * as _ from "lodash";
import { GridSquareColor } from "./GridSquareColor";
import { Coordinate } from "./Coordinate";

const MAX_SIZE = 1000;

export class Grid {
    private readonly gridList: GridSquare[];

    constructor(private readonly size: number, gridList?: GridSquare[]) {
        if (gridList != null) {
            this.gridList = gridList;
        } else {
            const gridArea = Math.min(size * size, MAX_SIZE * MAX_SIZE);
            this.gridList = _.range(0, gridArea).map(
                num => new GridSquare(0 as GridSquareColor)
            );
            if (size > MAX_SIZE) {
                console.warn(`Warning: Grid capped at ${MAX_SIZE}x${MAX_SIZE}`);
            }
        }
    }

    public getSquare = (coord: Coordinate) => {
        if (!this.isValidAccess(coord)) {
            throw new Error("invalid index");
        }
        const index = this.coordinateToIndex(coord);
        return this.gridList[index];
    };

    public isValidAccess = (coord: Coordinate) => {
        const { x, y } = coord;
        return x >= this.size || y >= this.size;
    };

    private coordinateToIndex = (coord: Coordinate) => {
        const { x, y } = coord;
        return y * this.size + x;
    };

    private copyGridList = () => {
        return this.gridList.map(gridSquare => {
            return new GridSquare(gridSquare.getColor);
        });
    };

    public updateGrid = (coord: Coordinate, color: GridSquareColor) => {
        const listCopy = this.copyGridList();
        const newIndex = this.coordinateToIndex(coord);
        listCopy[newIndex] = new GridSquare(color);
        return new Grid(this.size, listCopy);
    };
}
