'use strict';


import {showAsync} from "../actions/modals";
import { store } from "../index";


export const showModal = (type, data) => showAsync(type, data, store.dispatch);
