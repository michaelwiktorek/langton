import { Coordinate } from "./Coordinate";
import { Direction } from "./Direction";

export interface Bug {
    position: Coordinate;
    direction: Direction;
}

export function copyBug(bug: Bug): Bug {
    const position = bug.position;
    return {
        position: {
            x: position.x,
            y: position.y
        },
        direction: bug.direction
    };
}
