import { GridSquareColor } from "./GridSquareColor";
import { Coordinate } from "./Coordinate";

export interface Grid {
    data: GridSquareColor[][];
}

export function getSquare(grid: Grid, coord: Coordinate): GridSquareColor {
    return grid.data[coord.x][coord.y];
}

export function newGrid(size: number): Grid {
    const newGrid: GridSquareColor[][] = [];
    for (let i = 0; i < size; i++) {
        const row: GridSquareColor[] = [];
        for (let j = 0; j < size; j++) {
            row.push(0);
        }
        newGrid.push(row);
    }
    return { data: newGrid };
}
