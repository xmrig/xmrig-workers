'use strict';

import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux';
import modal from './modal';
import workers from './workers';
import settings from './settings';


export default (history) => combineReducers({
  router: connectRouter(history),
  modal,
  workers,
  settings
});
