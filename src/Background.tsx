import React, {FC, HTMLAttributes} from 'react';
import {KnobConfigType} from "./knobConfig";
import {KnobSkinType} from "./skin";

export interface KnobBackgroundProps extends HTMLAttributes<HTMLDivElement> {
    config: KnobConfigType;
    skin: KnobSkinType;
}

export const Background: FC<KnobBackgroundProps> = ({config, skin}: KnobBackgroundProps) => {
    return <circle cx="50" cy="50" r={skin.bg_radius}
                   fill={skin.bg_color} stroke={skin.bg_border_color}
                   strokeWidth={skin.bg_border_width}
                   className="react-svg-knob-bg" />;
};
