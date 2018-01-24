import { Coordinate } from "./Coordinate";

export enum Direction {
    NORTH = "north",
    SOUTH = "south",
    EAST = "east",
    WEST = "west"
}

export enum Rotation {
    CLOCKWISE = "clockwise",
    COUNTER_CLOCKWISE = "counter-clockwise",
    AROUND = "u-turn",
    NONE = "none"
}

const directions = [
    Direction.NORTH,
    Direction.EAST,
    Direction.SOUTH,
    Direction.WEST
];

export function rotate(
    currentDirection: Direction,
    rotation: Rotation
): Direction {
    const currentIndex = directions.indexOf(currentDirection);
    switch (rotation) {
        case Rotation.CLOCKWISE:
            return directions[(currentIndex + 1) % directions.length];
        case Rotation.COUNTER_CLOCKWISE:
            return directions[mod(currentIndex - 1, directions.length)];
        case Rotation.AROUND:
            return directions[(currentIndex + 2) % directions.length];
        case Rotation.NONE:
            return currentDirection;
    }
}

export function translate(
    position: Coordinate,
    direction: Direction
): Coordinate {
    switch (direction) {
        case Direction.NORTH:
            return { x: position.x, y: position.y + 1 };
        case Direction.EAST:
            return { x: position.x + 1, y: position.y };
        case Direction.SOUTH:
            return { x: position.x, y: position.y - 1 };
        case Direction.WEST:
            return { x: position.x - 1, y: position.y };
    }
}

function mod(n: number, m: number) {
    return (n % m + m) % m;
}
