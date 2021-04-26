'use strict';

import bs58 from 'bs58';
import {getSettings} from "../settings";
import {STORAGE_KEY} from "../Workers";
import { Buffer } from 'buffer';


function serialize(str = true) {
  const settings = getSettings();
  const workers  = (JSON.parse(localStorage.getItem(STORAGE_KEY)) || []).map(worker => ([
    worker[0].replace('http://', ''),
    worker[1],
    worker[2],
    worker[3]
  ]));

  const array = [1, [ settings.interval ], workers];

  if (str === true) {
    return bs58.encode(Buffer.from(JSON.stringify(array)));
  }

  return array;
}


function deserialize(data) {
  const settings = { interval: data[1][0] };
  const workers = data[2].map(worker => ([
    worker[0].indexOf('https://') === 0 ? worker[0] : ('http://' + worker[0]),
    worker[1],
    worker[2],
    worker[3],
    0
  ]));

  return { settings, workers }
}


export default {
  serialize,
  deserialize
}
