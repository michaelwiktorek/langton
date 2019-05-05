import { GridSquareColor, GridSquareNull } from "./GridSquareColor";
import { Coordinate } from "./Coordinate";

export interface GridSquare {
    color: GridSquareColor;
    rendered: boolean;
}

export interface Grid {
    data: GridSquare[][];
}

function invalid(grid: Grid, coord: Coordinate): boolean {
    return (
        coord.x >= grid.data[0].length ||
        coord.y >= grid.data.length ||
        grid.data[coord.y] == null
    );
}

function throwInvalid(coord: Coordinate) {
    throw new Error(`Access outside of grid at ${coord.x}, ${coord.y}`);
}

function throwIfInvalid(grid: Grid, coord: Coordinate) {
    if (invalid(grid, coord)) {
        throwInvalid(coord);
    }
}

export function mutate_setSquare(
    grid: Grid,
    coord: Coordinate,
    data: GridSquare
) {
    throwIfInvalid(grid, coord);
    grid.data[coord.y][coord.x] = data;
}

export function getSquare(grid: Grid, coord: Coordinate): GridSquare {
    throwIfInvalid(grid, coord);
    return grid.data[coord.y][coord.x];
}

export function newGrid(height: number, width: number): Grid {
    const newGrid: GridSquare[][] = [];
    for (let i = 0; i < height; i++) {
        const row: GridSquare[] = [];
        for (let j = 0; j < width; j++) {
            row.push({
                color: GridSquareNull,
                rendered: false
            });
        }
        newGrid.push(row);
    }
    return { data: newGrid };
}
