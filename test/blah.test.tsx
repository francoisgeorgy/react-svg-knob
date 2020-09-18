import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as Knob } from '../stories/Knob.stories';

describe('Knob', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Knob />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
