import * as React from "react";
import { GameState } from "../../models/GameState";
import * as _ from "lodash";
import { GridCell } from "./GridCell";
import * as classnames from "classnames";

export interface GridRenderProps extends GameState {}

export function GridRender(props: GridRenderProps) {
    return (
        <div>
            {_.rangeRight(props.grid.getSize - 1).map((i, iIndex) => {
                return (
                    <div
                        key={`row${iIndex}`}
                        className={classnames(`row${iIndex}`, "row")}
                    >
                        {_.range(0, props.grid.getSize).map(j => {
                            const position = props.bug.position;
                            const mapPosition = { x: j, y: i };
                            const placeBug =
                                position.x === mapPosition.x &&
                                position.y === mapPosition.y;
                            return (
                                <GridCell
                                    key={`${i}-${j}`}
                                    color={props.grid.getSquare(mapPosition)}
                                    bug={placeBug ? props.bug : undefined}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
