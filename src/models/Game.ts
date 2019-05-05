import { Bug } from "./Bug";
import { Coordinate } from "./Coordinate";
import { rotate, translate } from "./Direction";
import { GameState } from "./GameState";
import { getSquare, Grid, mutate_setSquare, GridSquare } from "./Grid";
import { GridSquareColor } from "./GridSquareColor";
import { RuleSet } from "./RuleSet";

export interface DrawDatum {
    position: Coordinate;
    color: GridSquareColor;
}

export class Game {
    constructor(private rules: RuleSet) {}

    public mutableTick = (
        state: GameState
    ): { position: Coordinate; square: GridSquare } => {
        const { grid, bug } = state;
        const { color } = getSquare(grid, bug.position);
        const rule = this.rules[color];
        const newDirection = rotate(bug.direction, rule.rotation);
        const newColor = rule.color;
        const oldPosition = bug.position;
        const newPosition = this.updateBug(
            { direction: newDirection, position: bug.position },
            grid
        );
        const newSquare = { color: newColor, rendered: false };
        mutate_setSquare(state.grid, bug.position, newSquare);
        state.bug = { direction: newDirection, position: newPosition };
        return { position: oldPosition, square: newSquare };
    };

    private updateBug = (bug: Bug, grid: Grid) => {
        return translate(bug.position, bug.direction);
    };
}
