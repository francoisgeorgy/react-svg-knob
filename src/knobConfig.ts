
export const TRACE = false;

export const VIEWBOX_WIDTH = 100;
export const VIEWBOX_HEIGHT = 100;
export const HALF_WIDTH = 50;      // viewBox/2
export const HALF_HEIGHT = 50;     // viewBox/2

export const NS = "http://www.w3.org/2000/svg";
export const CW = true;    // clock-wise
export const CCW = !CW;    // counter clock-wise

export type KnobConfigType = {
    angle_max: number;
    angle_min: number;
    center_value: null;
    center_zero: boolean;
    default_value: number;
    display_raw: boolean;
    format: (v: any) => any;
    format_raw: (v: number) => number;
    initial_value: number;
    mouse_wheel_acceleration: number;
    rotation: boolean;
    snap_to_steps: boolean;
    value_max: number;
    value_min: number;
    value_position: number
    value_resolution: number;
    value_text: boolean;
    zero_at: number;
}

export const DEFAULT_CONFIG: KnobConfigType = {

    rotation: CW,

    default_value: 0,
    initial_value: 0,
    value_min: 0.0,
    value_max: 100.0,
    value_resolution: 1,        // null means ignore

    // split knob:
    center_zero: false,
    center_value: null,         // if null, the value will be computed from the min and max in the init() method

    // position:
    zero_at: 270.0,             // [deg] (polar) the 0 degree will be at 270 polar degrees (6 o'clock).
    angle_min: 30.0,            // [deg] Angle in knob coordinates (0 at 6 0'clock)
    angle_max: 330.0,           // [deg] Angle in knob coordinates (0 at 6 0'clock)

    // text displayed in the middle of the knob:
    value_text: true,
    value_position: HALF_HEIGHT + 8,    // empirical value: HALF_HEIGHT + config.font_size / 3

    // callback to get the text to display from the current value
    display_raw: false,                 // if true, format callback is ignored

    format_raw: (v: number) => Math.round(v),
    format: (v: number) => v.toFixed(0),                     // formatting of the displayed value

    // off_text: null,                     // text to display when raw_value = min
    // out_of_range_text: null,            // text to display when raw_value is out of range

    snap_to_steps: false,       // TODO

    // mouse wheel support:
    mouse_wheel_acceleration: 1
}