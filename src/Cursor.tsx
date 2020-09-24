// import React, { FC, HTMLAttributes, ReactChild } from 'react';
import React, {FC, HTMLAttributes} from 'react';
import {KnobConfigType} from "./knobConfig";
import {knobToPolarAngle} from "./maths";
import {getViewboxCoord} from "./svg";
import {KnobSkinType} from "./skin";

/**
 *
 * @returns {string}
 */
/*
function getTrackCursor(angle: number, cursor_radius: number, cursor_length: number): string {
    let a = knobToPolarAngle(angle);
    let from = getViewboxCoord(a, cursor_radius);
    let to = getViewboxCoord(a, cursor_radius + cursor_length);
    return `M ${from.x},${from.y} L ${to.x},${to.y}`;
}
*/

export interface KnobCursorProps extends HTMLAttributes<HTMLDivElement> {
    angle: number;
    config: KnobConfigType;
    skin: KnobSkinType;
}

export const Cursor: FC<KnobCursorProps> = ({angle, config, skin}) => {

    function getCursorPath() {
        let polar = knobToPolarAngle(angle);
        let from = getViewboxCoord(polar, skin.cursor_radius);
        let to = getViewboxCoord(polar, skin.cursor_radius + skin.cursor_length);
        return `M ${from.x},${from.y} L ${to.x},${to.y}`;
    }

    return <path d={getCursorPath()}
                 stroke="#42A5F5" strokeWidth={skin.cursor_width} strokeLinecap={skin.linecap}
                 fill="transparent"
                 className="react-svg-knob-cursor"></path>;
};
