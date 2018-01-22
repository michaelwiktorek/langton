import { Bug } from "./Bug";
import { Coordinate } from "./Coordinate";
import { Direction, translate, rotate } from "./Direction";
import { Grid } from "./Grid";
import { RuleSet } from "./RuleSet";
import { GridSquareColor } from "./GridSquareColor";

export interface GameState {
    grid: Grid;
    bug: Bug;
}

export class Game {
    private stateList: GameState[];

    constructor(
        private readonly size: number,
        startingPosition: Coordinate,
        startingDirection: Direction,
        private rules: RuleSet
    ) {
        const startingGrid = new Grid(size);
        const startingBug: Bug = {
            direction: startingDirection,
            position: startingPosition
        };
        this.stateList = [
            {
                grid: startingGrid,
                bug: startingBug
            }
        ];
    }

    public tick = () => {
        const { grid, bug } = this.getLatestState();
        const gridSquare = grid.getSquare(bug.position);
        const rule = this.rules[gridSquare.getColor];
        const newDirection = rotate(bug.direction, rule.rotation);
        const newColor = rule.color;
        const newPosition = this.moveBug(bug, grid);
        const newState = {
            bug: { direction: newDirection, position: newPosition },
            grid: grid.updateGrid(bug.position, newColor)
        };
        this.stateList.push(newState);
    };

    public getLatestState = () => {
        return this.stateList[this.stateList.length - 1];
    };

    private moveBug = (bug: Bug, grid: Grid) => {
        const newPosition = translate(bug.position, bug.direction);
        if (grid.isValidAccess(newPosition)) {
            return newPosition;
        } else {
            throw new Error("Bug will leave map");
        }
    };
}
