'use strict';

import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import createRootReducer from "../reducers";
import DevTools from "../containers/DevTools"
import history from "./history";
import {routerMiddleware} from "connected-react-router";


const configureStore = (preloadedState) => createStore(
  createRootReducer(history),
  preloadedState,
  compose(
    applyMiddleware(thunk, createLogger(), routerMiddleware(history)),
    DevTools.instrument()
  )
);


export default configureStore;
