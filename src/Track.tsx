// import React, { FC, HTMLAttributes, ReactChild } from 'react';
import React, {FC, HTMLAttributes} from 'react';
import {config} from "./config";
import {getArc} from "./svg";

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556


function getTrackPath(angle: number) {

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
        p = getArc(config.angle_min, angle, config.track_radius);
/*
    }
*/

    return p;
}


export interface Props extends HTMLAttributes<HTMLDivElement> {
    angle: number;
}

export const Track: FC<Props> = ({angle}) => {
    // return <path d="M 29.999939540051646,84.64098124473975 A 40,40 0 0,1 21.377244431841547,22.058313156048467"
    //              stroke="#42A5F5" strokeWidth="8" fill="transparent" strokeLinecap="butt"
    //              className="knob-track"></path>;
    return <path d={getTrackPath(angle)}
                 stroke="#42A5F5" strokeWidth="8" fill="transparent" strokeLinecap="butt"
                 className="knob-track"></path>;
};
