import * as React from "react";
import { Direction } from "../../models/Direction";
import * as Icon from "react-feather";

export interface BugRenderProps {
    direction: Direction;
}

export function BugRender(props: BugRenderProps) {
    switch (props.direction) {
        case Direction.NORTH:
            return <Icon.ChevronUp size={12} color={"white"} />;
        case Direction.EAST:
            return <Icon.ChevronRight size={12} color={"white"} />;
        case Direction.SOUTH:
            return <Icon.ChevronDown size={12} color={"white"} />;
        case Direction.WEST:
            return <Icon.ChevronLeft size={12} color={"white"} />;
    }
}
