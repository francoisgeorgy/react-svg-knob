
/**
 * Return polar coordinates angle from our "knob coordinates" angle
 */
export function knobToPolarAngle(angle: number, zero_at = 270.0): number {
    let a = zero_at - angle;
    if (a < 0) a = a + 360.0;
    // if (trace) console.log(`knobToPolarAngle ${angle} -> ${a}`);
    return a;
}

export function polarToKnobAngle(angle: number, zero_at = 270.0) {
    // "-" for changing CCW to CW
    // if (trace) console.log(`polarToKnobAngle ${angle} -> ${(config.zero_at - angle + 360.0) % 360.0}`);
    // return (config.zero_at - angle + 360.0) % 360.0;    // we add 360 to handle negative values down to -360

    return (zero_at - angle + 360.0) % 360.0;    // we add 360 to handle negative values down to -360
}

