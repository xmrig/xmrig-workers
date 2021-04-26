'use strict';

import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from '../reducers';
import history from "./history";
import {routerMiddleware} from "connected-react-router";


const configureStore = (preloadedState) => createStore(
  createRootReducer(history),
  preloadedState,
  compose(
    applyMiddleware(thunk, routerMiddleware(history))
  )
);


export default configureStore;
