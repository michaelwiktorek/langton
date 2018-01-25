import { GridSquareColor } from "./GridSquareColor";
import { Coordinate } from "./Coordinate";

export interface Grid {
    data: GridSquareColor[][];
}

export function getSquare(grid: Grid, coord: Coordinate): GridSquareColor {
    if (
        coord.x >= grid.data.length ||
        coord.y >= grid.data.length ||
        grid.data[coord.x] === undefined
    ) {
        throw new Error(`Access outside of grid at ${coord.x}, ${coord.y}`);
    }
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
