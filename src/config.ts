
export const TRACE = true;

export const VIEWBOX_WIDTH = 100;
export const VIEWBOX_HEIGHT = 100;
export const HALF_WIDTH = 50;      // viewBox/2
export const HALF_HEIGHT = 50;     // viewBox/2

export const NS = "http://www.w3.org/2000/svg";
export const CW = true;    // clock-wise
export const CCW = !CW;    // counter clock-wise

export const config = {

    label: false,

    rotation: CW,

    default_value: 0,
    initial_value: 0,
    value_min: 0.0,
    value_max: 100.0,
    value_resolution: 1,        // null means ignore

    // split knob:
    center_zero: false,
    center_value: null,         // if null, the value will be computed from the min and max in the init() method
    center_gap: 4,              // only used when center_zero=true; is the width of the gap between the left and right track around the zero value.

    // position:
    zero_at: 270.0,             // [deg] (polar) the 0 degree will be at 270 polar degrees (6 o'clock).
    angle_min: 30.0,            // [deg] Angle in knob coordinates (0 at 6 0'clock)
    angle_max: 330.0,           // [deg] Angle in knob coordinates (0 at 6 0'clock)

    // background disk:
    bg_radius: 32,
    bg_border_width: 1,

    // track background:
    track_bg_radius: 40,
    track_bg_width: 8,

    // track:
    track_radius: 40,
    track_width: 8,

    // cursor
    cursor_radius: 18,          // same unit as radius
    cursor_length: 10,
    cursor_width: 4,

    // appearance:
    palette: "light",
    bg: false,
    track_bg: true,
    track: true,
    cursor: false,
    // CSS class names
    linecap: "butt",                   // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap

    // text displayed in the middle of the knob:
    value_text: true,
    value_position: HALF_HEIGHT + 8,    // empirical value: HALF_HEIGHT + config.font_size / 3
    font_family: "sans-serif",
    font_size: 25,

    // callback to get the text to display from the current value
    display_raw: false,                 // if true, format callback is ignored
    format_raw: (v: number) => Math.round(v),
    format: (v: any) => v,                     // formatting of the displayed value
    // off_text: null,                     // text to display when raw_value = min
    // out_of_range_text: null,            // text to display when raw_value is out of range

    font_weight: "bold",
    markers: 0,                         // number of markers; 0 or false to disable
    markers_radius: 40,
    markers_length: 8,
    markers_width: 2,

    class_bg: "knob-bg",
    class_track_bg : "knob-track-bg",
    class_track : "knob-track",
    class_value : "knob-value",
    class_cursor : "knob-cursor",
    class_markers: "knob-markers",

    snap_to_steps: false,       // TODO

    // mouse wheel support:
    mouse_wheel_acceleration: 1,

    onchange: null              // callback function
}