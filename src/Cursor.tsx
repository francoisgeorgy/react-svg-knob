// import React, { FC, HTMLAttributes, ReactChild } from 'react';
import React, {FC, HTMLAttributes} from 'react';
import {config} from "./config";
import {knobToPolarAngle} from "./maths";
import {getViewboxCoord} from "./svg";


/**
 *
 * @returns {string}
 */
function getTrackCursor(angle: number): string {
    let a = knobToPolarAngle(angle);
    let from = getViewboxCoord(a, config.cursor_radius);
    let to = getViewboxCoord(a, config.cursor_radius + config.cursor_length);
    return `M ${from.x},${from.y} L ${to.x},${to.y}`;
}


export interface Props extends HTMLAttributes<HTMLDivElement> {
    angle: number;
}

export const Cursor: FC<Props> = ({angle}) => {
    return <path d={getTrackCursor(angle)}
                 stroke="#42A5F5" strokeWidth="4" fill="transparent" strokeLinecap="butt" className="knob-cursor"></path>;
};
