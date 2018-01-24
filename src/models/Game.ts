import { Bug } from "./Bug";
import { translate, rotate } from "./Direction";
import { Grid, getSquare } from "./Grid";
import { RuleSet } from "./RuleSet";
import { GameState } from "./GameState";
import { Coordinate } from "./Coordinate";
import { GridSquareColor } from "./GridSquareColor";

export class Game {
    constructor(private rules: RuleSet) {}

    public tick = (state: GameState) => {
        const { grid, bug } = state;
        const color = getSquare(grid, bug.position);
        const rule = this.rules[color];
        const newDirection = rotate(bug.direction, rule.rotation);
        const newColor = rule.color;
        const newPosition = this.updateBug(
            { direction: newDirection, position: bug.position },
            grid
        );
        const newState = {
            bug: { direction: newDirection, position: newPosition },
            grid: this.updateGrid(grid, bug.position, newColor)
        };
        return newState;
    };

    private updateBug = (bug: Bug, grid: Grid) => {
        return translate(bug.position, bug.direction);
    };

    private updateGrid(
        grid: Grid,
        bugPosition: Coordinate,
        color: GridSquareColor
    ): Grid {
        const size = grid.data.length;
        const newGrid: GridSquareColor[][] = [];
        for (let i = 0; i < size; i++) {
            if (bugPosition.x === i) {
                const newRow: GridSquareColor[] = [];
                for (let j = 0; j < size; j++) {
                    if (j === bugPosition.y) {
                        newRow.push(color);
                    } else {
                        newRow.push(grid.data[i][j]);
                    }
                }
                newGrid[i] = newRow;
            } else {
                newGrid[i] = grid.data[i];
            }
        }
        return { data: newGrid };
    }
}
