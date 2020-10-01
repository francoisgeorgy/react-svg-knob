// import React, { FC, HTMLAttributes, ReactChild } from 'react';
import React, {FC, HTMLAttributes} from 'react';
import {KnobConfigType} from "./knobConfig";
import {getArc} from "./svg";
import {KnobSkinType} from "./skin";

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556


function getTrackPath(angle: number, angle_min: number, angle_max: number, track_radius: number, cw: boolean) {

    // if (trace) console.log("getTrackPath()");

    let p = null;

/*
    if (config.center_zero) {

        if (Array.isArray(config.center_value)) {
            // let v = getValue();
            // console.log('center value is an array; getValue=', getValue(), typeof v);
            if (config.center_value.includes(getValue())) {
                if (trace) console.log("getTrackPath: center position, track not drawn");
                // track is not drawn when the value is at center
                return p;
            }
        } else {
            if (getValue() === config.center_value) {
                if (trace) console.log("getTrackPath: center position, track not drawn");
                // track is not drawn when the value is at center
                return p;
            }
        }

        // we assume the split is at 180 [deg] (knob"s angle)
        if (angle < 180) {
            p = getArc(Math.min(angle, left_track_end_angle), left_track_end_angle, config.track_radius);
        } else if (angle > 180) {
            p = getArc(right_track_start_angle, Math.max(angle, right_track_start_angle), config.track_radius);
        }

    } else {
*/
        // p = getArc(config.angle_min, angle, config.track_radius);
        p = getArc(angle_min, angle, track_radius, cw);
/*
    }
*/

    return p;
}


export interface KnobTrackProps extends HTMLAttributes<HTMLDivElement> {
    angle: number;
    config: KnobConfigType;
    skin: KnobSkinType;
}

export const Track: FC<KnobTrackProps> = ({angle, config, skin}) => {
    return <path d={getTrackPath(angle, config.angle_min, config.angle_max, skin.track_radius, config.rotation)}
                 stroke={skin.track_color}
                 strokeWidth={skin.track_width}
                 fill="transparent" strokeLinecap="butt"
                 className="react-svg-knob-track" />;
};
