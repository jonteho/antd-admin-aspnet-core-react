import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import "./css/ant.less";

import { store } from './_helpers';
import { App } from './App';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);