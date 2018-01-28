import { Bug } from "./Bug";
import { translate, rotate } from "./Direction";
import { Grid, getSquare } from "./Grid";
import { RuleSet } from "./RuleSet";
import { GameState } from "./GameState";
import { Coordinate } from "./Coordinate";
import { GridSquareColor } from "./GridSquareColor";

export interface DrawDatum {
    position: Coordinate;
    color: GridSquareColor;
}

export class Game {
    constructor(private rules: RuleSet) {}

    public mutableTick = (state: GameState) => {
        const { grid, bug } = state;
        const color = getSquare(grid, bug.position);
        const rule = this.rules[color];
        const newDirection = rotate(bug.direction, rule.rotation);
        const newColor = rule.color;
        const oldPosition = bug.position;
        const newPosition = this.updateBug(
            { direction: newDirection, position: bug.position },
            grid
        );
        state.grid.data[bug.position.x][bug.position.y] = newColor;
        state.bug = { direction: newDirection, position: newPosition };
        return { position: oldPosition, color: newColor };
    };

    private updateBug = (bug: Bug, grid: Grid) => {
        return translate(bug.position, bug.direction);
    };
}
