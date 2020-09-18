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
        <div>
            react-svg-knob
            <div className="f">
                <div>
                    dummy
                </div>
                <div className="g">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div style={{"width": "100px"}}>
                        <Knob onKnobChange={onKnobChange}/>
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    dummy
                </div>
            </div>
            <div>
                {n}
            </div>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
