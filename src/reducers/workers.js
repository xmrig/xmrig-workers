'use strict';


import update from 'immutability-helper';
import Workers from "../app/Workers";
import {WORKER_ADDED, WORKER_CHANGED, WORKER_REMOVED} from "../constants/ActionTypes";


const INITIAL_STATE = Workers.load();


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WORKER_ADDED:
      return { keys: update(state.keys, {$push: [ action.worker.url ]}), values: {...state.values, [action.worker.url]: action.worker }};

    case WORKER_CHANGED:
      return {...state, values: {...state.values, [action.worker.url]: action.worker }};

    case WORKER_REMOVED: {
      const index = state.keys.indexOf(action.url);
      if (index === -1) {
        return state;
      }

      return { keys: update(state.keys, {$splice: [[index, 1]]}), values: update(state.values, {$unset: [action.url]})};
    }
  }
  return state;
}
