import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Knob} from '../.';

const App = () => {
    return (
        <div>
            react-svg-knob
            <div style={{"width": "100px"}}>
                <Knob/>
            </div>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
