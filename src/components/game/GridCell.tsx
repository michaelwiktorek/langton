import * as classnames from "classnames";
import * as React from "react";
import { BugRender } from "./BugRender";
import { Bug } from "../../models/Bug";

export interface GridCellProps {
    color: number;
    bug?: Bug;
}

export function GridCell(props: GridCellProps) {
    return (
        <div className={classnames("grid-cell", `color-${props.color}`)}>
            {props.bug != null && <BugRender direction={props.bug.direction} />}
        </div>
    );
}
