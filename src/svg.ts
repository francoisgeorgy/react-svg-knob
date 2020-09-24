import {HALF_HEIGHT, HALF_WIDTH} from "./knobConfig";


/**
 * Return viewBox X,Y coordinates
 * @param angle in [degree] (polar, 0 at 3 o'clock)
 * @param radius; defaults to config.radius
 * @returns {{x: number, y: number}}
 */
export function getViewboxCoord(angle: number, radius: number, cw: boolean = true) {
    let a = angle * Math.PI / 180.0;
    // let r = radius === undefined ? config.track_radius : radius;
    let r = radius;
    let x = Math.cos(a) * r;
    let y = Math.sin(a) * r;
    return {
        x: cw ? (HALF_WIDTH + x) : (HALF_WIDTH - x),
        y: HALF_HEIGHT - y
    }
}

/**
 *
 * @param from_angle in [degree] in knob's coordinates
 * @param to_angle in [degree] in knob's coordinates
 * @param radius
 */
import {knobToPolarAngle} from "./maths";

export function getArc(from_angle: number, to_angle: number, radius: number, cw: boolean = true): string {

    // if (trace) console.group(`getArc(${from_angle}, ${to_angle}, ${radius})`);

    // SVG d: "A rx,ry xAxisRotate LargeArcFlag,SweepFlag x,y".
    // SweepFlag is either 0 or 1, and determines if the arc should be swept in a clockwise (1), or anti-clockwise (0) direction
    // ref: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d

    let a0 = knobToPolarAngle(from_angle);
    let a1 = knobToPolarAngle(to_angle);

    // little trick to force a full arc (360deg) when from=0 and to=360
    if (from_angle !== to_angle) {
        // with this we make sure that x1 will be different than x0 within the path definition
        a0 -= 0.0001;
        a1 += 0.0001;
    }

    let {x: x0, y: y0} = getViewboxCoord(a0, radius);
    let {x: x1, y: y1} = getViewboxCoord(a1, radius);

    let delta_angle = (a0 - a1 + 360.0) % 360.0;

    let large_arc = delta_angle < 180.0 ? 0 : 1;
    let arc_direction = cw ? 1 : 0;
    // let arc_direction = 0;

    let p = `M ${x0},${y0} A ${radius},${radius} 0 ${large_arc},${arc_direction} ${x1},${y1}`;

    // if (trace) console.groupEnd();
    // if (trace) console.log("arc: " + p);

    return p;
}
