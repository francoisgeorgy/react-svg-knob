import React, {FC, HTMLAttributes} from 'react';
import {KnobConfigType, TRACE} from "./knobConfig";
import {KnobSkinType} from "./skin";

export interface TextProps extends HTMLAttributes<HTMLDivElement> {
    text: number|string;
    config: KnobConfigType;
    skin: KnobSkinType;
}

export const Text: FC<TextProps> = ({text, config, skin}) => {

    return <text x={skin.value_x} y={skin.value_y}
                 textAnchor="middle"
                 cursor="default"
                 fontFamily={skin.font_family} fontSize={skin.font_size} fontWeight={skin.font_weight}
                 fill={skin.text_fill}
                 className="react-svg-knob-value">{text}</text>;

};
