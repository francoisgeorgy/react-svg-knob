import React, {FC, HTMLAttributes} from 'react';
import {KnobConfigType, TRACE} from "./knobConfig";
import {KnobSkinType} from "./skin";

export interface TextProps extends HTMLAttributes<HTMLDivElement> {
    text: number|string;
    config: KnobConfigType;
    skin: KnobSkinType;
}

export const Text: FC<TextProps> = ({text, config, skin}) => {

    return <text x="50" y="58" textAnchor="middle" cursor="default" fontFamily="sans-serif" fontSize="25"
                 fontWeight="bold" fill="#424242" className="react-svg-knob-value">{text}</text>;

};
