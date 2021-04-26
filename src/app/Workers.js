'use strict';


import remove from "lodash/remove";
import mapValues from "lodash/mapValues";
import Net from "./Net";
import {store} from "../index";
import {SETTINGS_CHANGED, WORKER_ADDED, WORKER_CHANGED, WORKER_REMOVED} from "../constants/ActionTypes";
import Worker from "./models/Worker";
import events from './events';


const EMPTY_STATE  = { keys: [], values: {} };
export const STORAGE_KEY  = 'xmrig.workers';


class Workers {
  static state = EMPTY_STATE;


  static get(url, token) {
    return Net.get(url + '/1/summary', token)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }

        throw new Error(response.statusText);
      });
  }


  static add(url, token) {
    return Workers.get(url, token)
      .then(summary => Workers.set(url, token, summary));
  }


  static update(url, token, oldUrl) {
    return Workers.get(url, token)
      .then(summary => {
        if (url !== oldUrl) {
          Workers.remove(oldUrl);
        }

        return Workers.set(url, token, summary);
      });
  }


  static remove(url) {
    const worker = Workers.getSync(url);

    if (worker) {
      remove(Workers.state.keys, n => n === url);
      delete Workers.state.values[url];

      worker.destroy();
      Workers.save();
    }

    store.dispatch({ type: WORKER_REMOVED, url });
  }


  static load() {
    Workers.state = { ...EMPTY_STATE };

    try {
      const items = JSON.parse(localStorage.getItem(STORAGE_KEY));

      for (let item of items) {
        Workers.state.keys.push(item[0]);
        Workers.state.values[item[0]] = Worker.fromArray(item);
      }
    }
    catch (e) {
    }

    return { keys: [...Workers.state.keys], values: mapValues(Workers.state.values, worker => worker.toPlainObject())};
  }


  static save() {
    const workers = Workers.state.keys.map(url => Workers.state.values[url].toArray());

    localStorage.setItem(STORAGE_KEY, JSON.stringify(workers));
  }


  static set(url, token, summary) {
    const old = Workers.getSync(url);

    if (!old) {
      const worker = Worker.fromSummary(url, token, summary);

      Workers.state.keys.push(worker.url);
      Workers.state.values[worker.url] = worker;
      Workers.save();

      store.dispatch({ type: WORKER_ADDED, worker: worker.toPlainObject() });

      return worker;
    }

    old.setSummary(summary);
    old.token = token;

    Workers.save();

    store.dispatch({ type: WORKER_CHANGED, worker: old.toPlainObject() });

    return old;
  }


  static getSync(url) {
    return Workers.state.values[url];
  }
}


events.on(SETTINGS_CHANGED, () => {
  const { values } = Workers.state;

  for (const url in values) {
    if (values.hasOwnProperty(url)) {
      values[url].refresh();
    }
  }
});


export default Workers;
