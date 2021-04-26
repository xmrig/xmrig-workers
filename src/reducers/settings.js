'use strict';

import {getSettings} from "../app/settings";
import {SETTINGS_CHANGED} from "../constants/ActionTypes";


const INITIAL_STATE = getSettings();


export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case SETTINGS_CHANGED:
      return action.settings;
  }

  return state;
}
