import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Fragment, useState} from "react";
import {Knob} from '../.';
import "./main.css";

const App = () => {

    const [initialValue, setInitialValue] = useState(42);

    const [n, setN] = useState(0);
    const onKnobChange = n => {
        setN(n);
    }

    function simpleDisplay(v: number): string {
        return v.toFixed(0);
    }

    function customDisplay(v: number): JSX.Element {
        return <Fragment>yop<br />{v.toFixed(2)}</Fragment>;
    }

    function setValue() {
        const v = window.prompt("value");
        const n = parseFloat(v || '');
        if (isNaN(n)) return;
        setInitialValue(n);
    }

    return (
        <div className="centered">
            <div style={{"width": "80vh"}}>
                <Knob initialValue={initialValue} onKnobChange={onKnobChange} config={{format: simpleDisplay}} skin={{font_size: 20, linecap: "round", cursor_radius: 21}} />
                <div>{initialValue}, {n}</div>
                <div>
                    <button type="button" onClick={setValue}>set value</button>
                </div>
            </div>
        </div>

    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
