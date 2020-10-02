import React, {FC, HTMLAttributes} from 'react';
import {KnobConfigType} from "./knobConfig";
import {knobToPolarAngle} from "./maths";
import {getViewboxCoord} from "./svg";
import {KnobSkinType} from "./skin";

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
            strokeWidth={skin.cursor_width} strokeLinecap={skin.cursor_linecap}
            stroke={skin.cursor_color}
            fill="transparent"
            className="react-svg-knob-cursor" />;
};
