// import React, { FC, HTMLAttributes, ReactChild } from 'react';
import React, {FC, HTMLAttributes, MouseEvent, useEffect, useRef, useState} from "react";
import {Track} from "./Track";
import {TrackBackground} from "./TrackBackground";
import {Background} from "./Background";
import {Cursor} from "./Cursor";
import {Text} from "./Text";
import {polarToKnobAngle} from "./maths";
import {DEFAULT_CONFIG, KnobConfigType, TRACE, VIEWBOX_HEIGHT, VIEWBOX_WIDTH} from "./knobConfig";
import {CCW} from "./knobConfig";
import {DEFAULT_SKIN, KnobSkinType} from "./skin";

export interface KnobProps extends HTMLAttributes<HTMLDivElement> {
    onKnobChange: (n: number) => void;
    config?: KnobConfigType;
    skin?: KnobSkinType;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
export const Knob: FC<KnobProps> = ({onKnobChange, config, skin}) => {

    const knob_config: KnobConfigType = Object.assign({}, DEFAULT_CONFIG, config);
    const knob_skin: KnobSkinType = Object.assign({}, DEFAULT_SKIN, skin);

    const svgElementRef = useRef(null);

    let targetRect: any = null;

    // The knob view is only dependent of the angle:
    const [angle, setAngle] = useState(knob_config.angle_min);  // current knob's value [value_min..value_max]

    useEffect(() => {
        // if (TRACE) console.log("Knob.useEffect");

        // @ts-ignore
        // if (TRACE) console.log("svgElementRef getBoundingClientRect", svgElementRef ? svgElementRef.current.getBoundingClientRect(): null);

        updateBounds();
    }, []); //empty dependency array so it only runs once at render

    /**
     * Trick to adjust the cursor position when the range is odd.
     */
    function getCursorCorrection(): number {
        let isOdd = (n: number) => Math.abs(n % 2) === 1;
        return isOdd(Math.abs(knob_config.value_max - knob_config.value_min)) ? 0.5 : 0;
    }

    function initValue(): void {
        //TODO
        // set initial value and angle:
        setValue(knob_config.initial_value ? knob_config.initial_value : knob_config.default_value);
    }

    /**
     * Set knob's value
     * @param v
     */
    function setValue(v: number): void {
        //TODO
        /*
                if (v < knob_config.value_min) {
                    value = knob_config.value_min;
                } else if (v > knob_config.value_max) {
                    value = knob_config.value_max;
                } else {
                    value = v;
                }
                setAngle(((v + getCursorCorrection() - knob_config.value_min) / (knob_config.value_max - knob_config.value_min)) * (knob_config.angle_max - knob_config.angle_min) + knob_config.angle_min);
                if (trace) console.log(`setValue(${v}) angle=` + ((v - knob_config.value_min) / (knob_config.value_max - knob_config.value_min)) * (knob_config.angle_max - knob_config.angle_min) + knob_config.angle_min);
                return true;
        */
    }
    /**
     *
     * @param degrees [deg] in knob's coordinates
     * @returns {*}
     */
    function getDisplayValue(degrees: number): string {
        if (TRACE) console.log("getDisplayValue", knob_config.display_raw);
        let v = getValue(degrees);
        return knob_config.display_raw ? knob_config.format_raw(v) : knob_config.format(v);
    }

    /**
     * Return the value "rounded" according to knob_config.value_resolution
     * @param v value
     */
    function getRoundedValue(v: number): number {
        return knob_config.value_resolution === null ? v : Math.round(v / knob_config.value_resolution) * knob_config.value_resolution;
    }

    /**
     * Get the knob's value determined by the knob's position (angle)
     * @param degrees [deg] in knob's coordinates
     * @returns {number}
     */
    function getValue(degrees: number): number {
        // let p = degrees === undefined ? angle : degrees;
        let v = ((degrees - knob_config.angle_min) / (knob_config.angle_max - knob_config.angle_min)) * (knob_config.value_max - knob_config.value_min) + knob_config.value_min;
        return getRoundedValue(v - getCursorCorrection());
    }

    function updateBounds() {
        if (svgElementRef) {
            // @ts-ignore
            targetRect = svgElementRef.current.getBoundingClientRect();
            if (TRACE) console.log("updateBounds", targetRect);
        }
    }

    /**
     *
     * @param degrees: angle in degrees
     */
    function updateAngle(degrees: number) {

        let new_angle = Math.min(Math.max(degrees, knob_config.angle_min), knob_config.angle_max);

        // if (TRACE) console.log("updateAngle", degrees, new_angle, knob_config.angle_min, knob_config.angle_max);

        setAngle(new_angle);

        // let prev = angle;
        // let notify = fire_event && (new_angle !== angle);
        let notify = (new_angle !== angle); //TODO: notify flag
        if (notify) {
            // fire the event if the change of angle affect the value:
            // onKnobChange(new_angle);


            console.log("updateAngle", getValue(new_angle));


            onKnobChange(getValue(new_angle));
            //TODO:
            // if (getValue(prev) !== getValue()) {
            //     notifyChange();
            // }
        }
        // if (trace) console.log("knob value has changed");
        // let value = getValue();     // TODO: cache the value
        // if (Math.abs(a - angle) > 2) {  //TODO: define Epsilon
        //     setAngle(degrees);
            // if (TRACE) console.log("call Knob's callback");
            // onKnobChange(degrees)
        // }
    }

    const mouseUpdate = (e: Event) => {

        /*
            // MouseEvent.clientX (standard property: YES)
            // The clientX read-only property of the MouseEvent interface provides
            // the horizontal coordinate within the application's client area at which
            // the event occurred (as opposed to the coordinates within the page).
            // For example, clicking in the top-left corner of the client area will always
            // result in a mouse event with a clientX value of 0, regardless of whether
            // the page is scrolled horizontally. Originally, this property was defined
            // as a long integer. The CSSOM View Module redefined it as a double float.

            let dxPixels = e.clientX - targetRect.left;
            let dyPixels = e.clientY - targetRect.top;

            // mouse delta in cartesian coordinate with path center=0,0 and scaled (-1..0..1) relative to path:
            // <svg> center:       (dx, dy) == ( 0,  0)
            // <svg> top-left:     (dx, dy) == (-1,  1)
            // <svg> bottom-right: (dx, dy) == ( 1, -1) (bottom right of the 100x100 viewBox, ignoring the bottom 100x20 for the label)
            let dx = (dxPixels - arcCenterXPixels) / (targetRect.width / 2);
            let dy = - (dyPixels - arcCenterYPixels) / (targetRect.width / 2);  // targetRect.width car on a 20px de plus en hauteur pour le label

            if (conf.rotation === CCW) dx = - dx;

            // convert to polar coordinates
            let angle_rad = Math.atan2(dy, dx);
            if (angle_rad < 0) angle_rad = 2.0*Math.PI + angle_rad;

            if (trace) if (TRACE) console.log(`mouseUpdate: position in svg = ${dxPixels}, ${dyPixels} pixels; ${dx.toFixed(3)}, ${dy.toFixed(3)} rel.; angle ${angle_rad.toFixed(3)} rad`);

            setAngle(polarToKnobAngle(angle_rad * 180.0 / Math.PI), true);
        */
        // let dxPixels = e.clientX - targetRect.left;
        // let dyPixels = e.clientY - targetRect.top;
        // @ts-ignore
        if (TRACE) console.log("mouseUpdate", "targetRect: left, top, width, e.clientX, e.clientY", e, targetRect.left, targetRect.top, targetRect.width, e.clientX, e.clientY);

        if (targetRect !== null) {

            // @ts-ignore
            let dxPixels = e.clientX - targetRect.left;
            // @ts-ignore
            let dyPixels = e.clientY - targetRect.top;

            // By design, the arc center is at equal distance from top and left.
            // @ts-ignore
            const arcCenterXPixels = targetRect.width / 2;
            //noinspection JSSuspiciousNameCombination
            const arcCenterYPixels = arcCenterXPixels;


            // @ts-ignore
            let dx = (dxPixels - arcCenterXPixels) / (targetRect.width / 2);
            // @ts-ignore
            let dy = -(dyPixels - arcCenterYPixels) / (targetRect.width / 2);  // targetRect.width car on a 20px de plus en hauteur pour le label

            if (knob_config.rotation === CCW) dx = - dx;

            // convert to polar coordinates
            let angle_rad = Math.atan2(dy, dx);
            if (angle_rad < 0) angle_rad = 2.0*Math.PI + angle_rad;

            // if (trace) if (TRACE) console.log(`mouseUpdate: position in svg = ${dxPixels}, ${dyPixels} pixels; ${dx.toFixed(3)}, ${dy.toFixed(3)} rel.; angle ${angle_rad.toFixed(3)} rad`);

            const a = polarToKnobAngle(angle_rad * 180.0 / Math.PI);

            if (TRACE) console.log("mouseUpdate", "arcCenterXPixels, arcCenterYPixels, dxPixels, dyPixels, dx, dy, angle", arcCenterXPixels, arcCenterYPixels, dxPixels, dyPixels, dx, dy, a);

            updateAngle(a);
        }

    }

    const mouseDownHandler = (e: MouseEvent) => {

        // if (TRACE) console.log("mouseDown", e, e.nativeEvent);

        e.preventDefault();

        // If the knob is not the last element being rendered on the page, it's boundingRect may still be updated if other elements
        // are added in the page. It's therefore important to always get an updated value:
        updateBounds();

        // if (TRACE) console.log("window.addEventListener");
        // @ts-ignore
        document.addEventListener('mousemove', mouseMoveHandler);
        // @ts-ignore
        document.addEventListener('mouseup', mouseUpHandler);

        mouseUpdate(e.nativeEvent);
    };

    const mouseUpHandler = (e: Event) => {
        // if (TRACE) console.log("mouseUp", e);
        // setDragging(false);

        // if (TRACE) console.log("window.removeEventListener");
        // @ts-ignore
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = (e: Event) => {
        // if (TRACE) console.log("mouseMove", e);
        e.preventDefault();
        mouseUpdate(e);
    };

    return (
        <svg ref={svgElementRef} viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} className="react-svg-knob" onMouseDown={mouseDownHandler}>
            {knob_skin.bg && <Background config={knob_config} skin={knob_skin}/>}
            {knob_skin.track_bg && <TrackBackground config={knob_config} skin={knob_skin}/>}
            {knob_skin.track && <Track angle={angle} config={knob_config} skin={knob_skin}/>}
            {knob_skin.cursor && <Cursor angle={angle} config={knob_config} skin={knob_skin}/>}
            {knob_skin.text && <Text text={getDisplayValue(angle)} config={knob_config} skin={knob_skin}/>}
        </svg>
    );
};
