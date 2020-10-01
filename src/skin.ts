
export const TRACE = true;

export const VIEWBOX_WIDTH = 100;
export const VIEWBOX_HEIGHT = 100;
export const HALF_WIDTH = 50;      // viewBox/2
export const HALF_HEIGHT = 50;     // viewBox/2

export const NS = "http://www.w3.org/2000/svg";
export const CW = true;    // clock-wise
export const CCW = !CW;    // counter clock-wise

export type PublicKnobSkinType = {
    bg?: boolean;
    bg_color?: string;
    bg_border_width?: number;
    bg_border_color?: string;
    bg_radius?: number;
    center_gap?: number;
    cursor?: boolean;
    cursor_length?: number;
    cursor_radius?: number;
    cursor_width?: number;
    cursor_color?: string;
    font_family?: string;
    font_size?: number;
    font_weight?: string;
    text_fill?: string;
    label?: boolean;
    linecap?: "butt" | "round" | "square" | "inherit" | undefined;
    markers?: number;
    markers_length?: number;
    markers_radius?: number;
    markers_width?: number;
    text?: boolean;
    track?: boolean;
    track_bg?: boolean;
    track_bg_radius?: number;
    track_bg_width?: number;
    track_radius?: number;
    track_width?: number;
    track_color?: string;
    value_x?: number;
    value_y?: number;
    value_text?: boolean;
}

export type KnobSkinType = {
    bg: boolean;
    bg_color: string;
    bg_border_width: number;
    bg_border_color: string;
    bg_radius: number;
    center_gap: number;
    cursor: boolean;
    cursor_length: number;
    cursor_radius: number;
    cursor_width: number;
    cursor_color: string;
    font_family: string;
    font_size: number;
    font_weight: string;
    text_fill?: string;
    label: boolean;
    linecap: "butt" | "round" | "square" | "inherit" | undefined;
    markers: number;
    markers_length: number;
    markers_radius: number;
    markers_width: number;
    text: boolean;
    track: boolean;
    track_bg: boolean;
    track_bg_radius: number;
    track_bg_width: number;
    track_bg_color: string;
    track_radius: number;
    track_width: number;
    track_color: string;
    value_x: number;
    value_y: number;
    value_text: boolean;
}

export const DEFAULT_SKIN: KnobSkinType = {

    label: false,
    bg: false,
    track: true,
    track_bg: true,
    cursor: true,
    text: true,

    // split knob:
    center_gap: 4,              // only used when center_zero=true; is the width of the gap between the left and right track around the zero value.

    // background disk:
    bg_radius: 32,
    bg_border_width: 1,
    bg_border_color: "#BDBDBD",
    bg_color: "#E0E0E0",

    // track background:
    track_bg_radius: 40,
    track_bg_width: 8,
    track_bg_color: "#CFD8DC",

    // track:
    track_radius: 40,
    track_width: 8,
    track_color: "#42A5F5",

    // cursor
    cursor_radius: 25,          // same unit as radius
    cursor_length: 19,
    cursor_width: 8,
    cursor_color: "#42A5F5",

    // CSS class names
    linecap: "butt",                   // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap

    // text displayed in the middle of the knob:
    value_text: true,
    value_x: HALF_WIDTH,
    value_y: HALF_HEIGHT + 8,    // empirical value: HALF_HEIGHT + config.font_size / 3
    font_family: "sans-serif",
    font_size: 25,
    font_weight: "bold",

    text_fill: "#424242",

    markers: 0,                         // number of markers; 0 or false to disable
    markers_radius: 40,
    markers_length: 8,
    markers_width: 2


}