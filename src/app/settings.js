'use strict';

import events from './events';
import {SETTINGS_CHANGED} from "../constants/ActionTypes";
import { store } from '../index';


let SETTINGS = null;

const KEY                 = SETTINGS_CHANGED;
export const SETTINGS_KEY = 'xmrig.settings';


export const getSettings = () => {
  if (!SETTINGS) {
    try {
      SETTINGS = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    }
    catch (e) {
      console.error(e);
    }
  }

  if (!SETTINGS) {
    SETTINGS = { interval: 10, oclPage: 0, cudaPage: 0 };
  }

  return SETTINGS;
};


export const saveSettings = settings => {
  SETTINGS = settings;

  localStorage.setItem(SETTINGS_KEY, JSON.stringify(SETTINGS));
  events.emit(KEY, SETTINGS);

  store.dispatch({ type: KEY, settings });
};
