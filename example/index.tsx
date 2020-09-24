import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {useState} from "react";
import {Knob} from '../.';
import "./main.css";

const App = () => {

    const [n, setN] = useState(0);
    const onKnobChange = n => {
        setN(n);
    }

    return (
        <div className="centered">
        <div style={{"width": "80vh"}}>
            <Knob onKnobChange={onKnobChange}/>
        </div>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
