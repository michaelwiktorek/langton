import { Rotation } from "./Direction";
import { GridSquareColor } from "./GridSquareColor";

export interface RuleSet {
    [index: number]: Move;
}

export interface Move {
    color: GridSquareColor;
    rotation: Rotation;
}

// L, R, A, N in sequence e.g. LLRLRLRLRL
export function turnSequenceToRuleSet(sequence: string): RuleSet {
    const rules: RuleSet = {};
    for (let i = 0; i < sequence.length; i++) {
        const nextNumber = i === sequence.length - 1 ? 0 : i + 1;
        switch (sequence[i]) {
            case "L":
                rules[i] = {
                    color: nextNumber,
                    rotation: Rotation.COUNTER_CLOCKWISE
                };
                break;
            case "R":
                rules[i] = {
                    color: nextNumber,
                    rotation: Rotation.CLOCKWISE
                };
                break;
            case "A":
                rules[i] = {
                    color: nextNumber,
                    rotation: Rotation.AROUND
                };
            case "N":
                rules[i] = {
                    color: nextNumber,
                    rotation: Rotation.NONE
                };
                break;
            default:
                throw new Error("incorrect turn sequence string " + sequence);
        }
    }
    return rules;
}
