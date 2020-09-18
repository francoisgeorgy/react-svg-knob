import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Knob} from '../.';
import {useState} from "react";

const App = () => {

    const [n, setN] = useState(0);
    const onKnobChange = n => {
        setN(n);
    }

    return (
        <div>
            react-svg-knob
            <div style={{"width": "100px"}}>
                <Knob onKnobChange={onKnobChange}/>
            </div>
            <div>
                {n}
            </div>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
