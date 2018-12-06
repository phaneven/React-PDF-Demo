import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.less';

render(<App />, document.getElementById('root'));

/**
 * HMR
 * replace when app changed
 * */
if (module.hot) {
  module.hot.accept('./App.js', () => {
    // eslint-disable-next-line no-console
    console.log('Accepting the updated App module!');
    render(<App />, document.getElementById('root'));
  });
}
