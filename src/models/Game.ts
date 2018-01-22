import { Bug } from "./Bug";
import { translate, rotate } from "./Direction";
import { Grid } from "./Grid";
import { RuleSet } from "./RuleSet";
import { GameState } from "./GameState";

export class Game {
    constructor(private rules: RuleSet) {}

    public tick = (state: GameState) => {
        const { grid, bug } = state;
        const gridSquare = grid.getSquare(bug.position);
        const rule = this.rules[gridSquare.getColor];
        const newDirection = rotate(bug.direction, rule.rotation);
        const newColor = rule.color;
        const newPosition = this.moveBug(bug, grid);
        const newState = {
            bug: { direction: newDirection, position: newPosition },
            grid: grid.updateGrid(bug.position, newColor)
        };
        return newState;
    };

    private moveBug = (bug: Bug, grid: Grid) => {
        const newPosition = translate(bug.position, bug.direction);
        if (grid.isValidAccess(newPosition)) {
            return newPosition;
        } else {
            throw new Error("Bug will leave map");
        }
    };

    // TODO improve this crap
    public renderGameState = (state: GameState) => {
        const size = state.grid.getSize;
        const output: string[] = [];
        for (let i = 0; i < size; i++) {
            let line = "";
            for (let j = 0; j < size; j++) {
                const color = state.grid.getSquare({ x: i, y: j }).getColor;
                line = line + (color === 0 ? "." : ",");
            }
            output.push(line);
        }
        return output;
    };
}
