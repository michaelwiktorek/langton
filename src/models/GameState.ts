import { Grid } from "./Grid";
import { Bug } from "./Bug";

export interface GameState {
    grid: Grid;
    bug: Bug;
}
