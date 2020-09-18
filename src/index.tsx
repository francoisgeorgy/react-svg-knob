// import React, { FC, HTMLAttributes, ReactChild } from 'react';
import React, {FC, HTMLAttributes, MouseEvent, useEffect, useRef, useState} from 'react';
import {Track} from "./Track";
import {TrackBackground} from "./TrackBackground";
import {Background} from "./Background";
import {Cursor} from "./Cursor";
import {Text} from "./Text";
import {polarToKnobAngle} from "./maths";
import {VIEWBOX_HEIGHT, VIEWBOX_WIDTH} from "./config";
import {CCW, config} from "./config";

export interface Props extends HTMLAttributes<HTMLDivElement> {
    onKnobChange: (n: number) => void,
    options?: string
}

function dummy(e: any) {
    console.log("dummy", e);
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
export const Knob: FC<Props> = ({onKnobChange, options}) => {

    // console.log("Knob: options", options);

    const svgElementRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [targetRect, setTargetRect] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [angle, setAngle] = useState(0.0);  // current knob's value [value_min..value_max]

    useEffect(() => {
        console.log("Knob.useEffect");
        if (svgElementRef) { // @ts-ignore
            setWidth(svgElementRef.current.getBoundingClientRect().width);
            // @ts-ignore
            setTargetRect(svgElementRef.current.getBoundingClientRect());
            /*
            svgElementRef getBoundingClientRect
                DOMRect: {x: 8, y: 26, width: 100, height: 100, top: 26, …}
                bottom: 126
                height: 100
                left: 8
                right: 108
                top: 26
                width: 100
                x: 8
                y: 26
            */
        }
        // @ts-ignore
        console.log("svgElementRef getBoundingClientRect", svgElementRef ? svgElementRef.current.getBoundingClientRect(): null);
    }, []); //empty dependency array so it only runs once at render

    const mouseDownHandler = (e: MouseEvent) => {
        console.log("mouseDown", e, e.nativeEvent);
        setDragging(true);

        //TODO: https://www.pluralsight.com/guides/event-listeners-in-react-components
        console.log("window.addEventListener");
        // @ts-ignore
        document.addEventListener('mousemove', mouseMoveHandler);
        // @ts-ignore
        document.addEventListener('mouseup', mouseUpHandler);
        // window.addEventListener('mouseMove', (event) => {
        //     console.log("Window.mouseMove", event);
        // });
    };

    const mouseUpHandler = (e: Event) => {
        console.log("mouseUp", e);
        setDragging(false);

        console.log("window.removeEventListener");
        // @ts-ignore
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        // window.removeEventListener('mouseMove', (event) => {
        //     console.log("Window.mouseMove", event);
        // });

    };

    const mouseMoveHandler = (e: Event) => {
        console.log("mouseMove", e);
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

            if (config.rotation === CCW) dx = - dx;

            // convert to polar coordinates
            let angle_rad = Math.atan2(dy, dx);
            if (angle_rad < 0) angle_rad = 2.0*Math.PI + angle_rad;

            if (trace) console.log(`mouseUpdate: position in svg = ${dxPixels}, ${dyPixels} pixels; ${dx.toFixed(3)}, ${dy.toFixed(3)} rel.; angle ${angle_rad.toFixed(3)} rad`);

            setAngle(polarToKnobAngle(angle_rad * 180.0 / Math.PI), true);
        */
        // let dxPixels = e.clientX - targetRect.left;
        // let dyPixels = e.clientY - targetRect.top;
        // @ts-ignore
        console.log("mouseMove", "targetRect.left, .top", targetRect.left, targetRect.top);

        if (targetRect !== null) {

            // @ts-ignore
            let dxPixels = targetRect ? e.clientX - targetRect.left : 0;
            // @ts-ignore
            let dyPixels = targetRect ? e.clientY - targetRect.top : 0;

            // By design, the arc center is at equal distance from top and left.
            // @ts-ignore
            const arcCenterXPixels = targetRect.width / 2;
            //noinspection JSSuspiciousNameCombination
            const arcCenterYPixels = arcCenterXPixels;


            // @ts-ignore
            let dx = (dxPixels - arcCenterXPixels) / (targetRect.width / 2);
            // @ts-ignore
            let dy = -(dyPixels - arcCenterYPixels) / (targetRect.width / 2);  // targetRect.width car on a 20px de plus en hauteur pour le label

            if (config.rotation === CCW) dx = - dx;

            // convert to polar coordinates
            let angle_rad = Math.atan2(dy, dx);
            if (angle_rad < 0) angle_rad = 2.0*Math.PI + angle_rad;

            // if (trace) console.log(`mouseUpdate: position in svg = ${dxPixels}, ${dyPixels} pixels; ${dx.toFixed(3)}, ${dy.toFixed(3)} rel.; angle ${angle_rad.toFixed(3)} rad`);

            const a = polarToKnobAngle(angle_rad * 180.0 / Math.PI);

            setAngle(a);
            console.log("call Knob's callback");
            onKnobChange(a)

            console.log("mouseMove", "dx, dy, angle", dxPixels, dyPixels, a);
        }
    };

/*
    const handleKeyDown = (event:any) => {
        console.log('A key was pressed', event.keyCode);
    };

    React.useEffect(() => {
        console.log("add keyDown");
        window.addEventListener('keydown', handleKeyDown);
        // window.addEventListener('mousemove', dummy);
        // cleanup this component
        return () => {
            console.log("remove keyDown");
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
*/

    return (
        <svg ref={svgElementRef} viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} className="react-svg-knob"
            onMouseDown={mouseDownHandler}>
            <Background/>
            <TrackBackground/>
            <Track angle={angle}/>
            <Cursor angle={angle}/>
            <Text angle={angle}/>
        </svg>
    );
};

/*

    boolean altKey
    number button
    number buttons
    number clientX
    number clientY
    boolean ctrlKey
    boolean getModifierState(key)
    boolean metaKey
    number pageX
    number pageY
    DOMEventTarget relatedTarget
    number screenX
    number screenY
    boolean shiftKey


    <svg class="knob" id="knob-with-bg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="32" fill="#E0E0E0" stroke="#BDBDBD" stroke-width="1" class="knob-bg"></circle>
        <path d="M 29.999939540051646,84.64098124473975 A 40,40 0 1,1 70.00006045994832,84.64098124473976" stroke="#CFD8DC"
              stroke-width="8" fill="transparent" stroke-linecap="butt" class="knob-track-bg"></path>
        <path d="M 29.999939540051646,84.64098124473975 A 40,40 0 0,1 32.85463405920261,13.860874017816307" stroke="#42A5F5"
              stroke-width="8" fill="transparent" stroke-linecap="butt" class="knob-track"></path>
        <path d="M 42.284613710256096,33.73737984210319 L 37.9982879937317,24.702590865493846" stroke="#42A5F5"
              stroke-width="4" fill="transparent" stroke-linecap="butt" class="knob-cursor"></path>
        <text x="50" y="58" text-anchor="middle" cursor="default" font-family="sans-serif" font-size="25" font-weight="bold"
              fill="#424242" class="knob-value">42
        </text>
    </svg>
*/
