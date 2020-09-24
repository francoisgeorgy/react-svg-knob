import React, {FC, HTMLAttributes} from 'react';
import {KnobConfigType} from "./knobConfig";
import {KnobSkinType} from "./skin";

export interface TextProps extends HTMLAttributes<HTMLDivElement> {
    angle: number;
    config: KnobConfigType;
    skin: KnobSkinType;
}

export const Text: FC<TextProps> = ({angle, config, skin}) => {
    return <text x="50" y="58" textAnchor="middle" cursor="default" fontFamily="sans-serif" fontSize="25"
                 fontWeight="bold" fill="#424242" className="react-svg-knob-value">{angle.toFixed(0)}</text>;
};
