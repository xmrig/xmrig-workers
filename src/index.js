'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import configureStore from "./store";
import history from "./store/history";
import fontawesome from "./app/fontawesome";

fontawesome();

export const store = configureStore({});

ReactDOM.render(
   <Root store={store} history={history} />, document.getElementById('root')
);
