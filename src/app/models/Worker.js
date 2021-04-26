'use strict';


import Net from "../Net";
import {getSettings} from "../settings";
import {store} from "../../index";
import {WORKER_CHANGED} from "../../constants/ActionTypes";


export default class Worker {
  static fromArray(array) {
    const worker = new Worker();

    worker.url     = array[0];
    worker.token   = array[1];
    worker.name    = array[2];
    worker.version = array[3];
    worker.ts      = array[4];

    worker.refresh();

    return worker;
  }


  static fromSummary(url, token, summary) {
    const worker = new Worker();

    worker.url     = url;
    worker.token   = token;

    worker.setSummary(summary);
    worker.schedule();

    return worker;
  }


  constructor() {
    this.url     = '';
    this.token   = '';
    this.name    = '';
    this.version = '';
    this.ts      = 0;
    this.summary = null;
    this.timeout = null;
  }


  setSummary(summary) {
    this.name    = summary.worker_id;
    this.version = summary.version;
    this.ts      = +new Date();
    this.summary = {...summary, status: 200};
  }


  toArray() {
    return [ this.url, this.token, this.name, this.version, this.ts ];
  }


  toPlainObject() {
    return {
      url:     this.url,
      token:   this.token,
      name:    this.name,
      version: this.version,
      ts:      this.ts,
    };
  }


  getSummary() {
    return Net.get(this.url + '/1/summary', this.token)
      .then(response => {
        if (response.status === 200) {
          return response.json()
            .then(summary => this.setSummary(summary));
        }

        this.ts      = +new Date();
        this.summary = { status: response.status };
      })
      .catch(err => {
        this.ts      = +new Date();
        this.summary = { status: 500 };
      })
  }


  refresh() {
    clearTimeout(this.timeout);

    return this.getSummary()
      .then(() => {
        store.dispatch({ type: WORKER_CHANGED, worker: this.toPlainObject() });

        this.schedule()
      });
  }


  schedule() {
    this.timeout = setTimeout(this.refresh.bind(this), getSettings().interval * 1000);
  }


  destroy() {
    clearTimeout(this.timeout);
  }
}
