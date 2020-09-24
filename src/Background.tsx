import React, {FC, HTMLAttributes} from 'react';
import {KnobConfigType} from "./knobConfig";
import {KnobSkinType} from "./skin";

export interface KnobBackgroundProps extends HTMLAttributes<HTMLDivElement> {
    config: KnobConfigType;
    skin: KnobSkinType;
}

export const Background: FC<KnobBackgroundProps> = ({config, skin}: KnobBackgroundProps) => {
    return <circle cx="50" cy="50" r="32" fill="#E0E0E0" stroke="#BDBDBD" strokeWidth="1" className="react-svg-knob-bg"></circle>;
};
