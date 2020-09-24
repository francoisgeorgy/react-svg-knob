import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Fragment, useState} from "react";
import {Knob} from '../.';
import "./main.css";

const App = () => {

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

    return (
        <div className="centered">
            <div style={{"width": "80vh"}}>
                <Knob onKnobChange={onKnobChange} config={{format: simpleDisplay}} skin={{font_size: 20, linecap: "round", cursor_radius: 21}} />
                <div>{n}</div>
            </div>
        </div>

    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
