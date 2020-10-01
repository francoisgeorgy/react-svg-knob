import React, {FC, HTMLAttributes} from 'react';
import {KnobConfigType} from "./knobConfig";
import {KnobSkinType} from "./skin";
import {getArc} from "./svg";

export interface KnobTrackBackgroundProps extends HTMLAttributes<HTMLDivElement> {
    config: KnobConfigType;
    skin: KnobSkinType;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
export const TrackBackground: FC<KnobTrackBackgroundProps> = ({config, skin}) => {
    return <path d={getArc(config.angle_min, config.angle_max, skin.track_bg_radius)}
                stroke={skin.track_bg_color}
                strokeWidth={skin.track_bg_width}
                fill="transparent" strokeLinecap="butt" className="react-svg-knob-track-bg" />;
};
