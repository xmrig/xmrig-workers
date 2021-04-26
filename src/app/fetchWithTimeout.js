'use strict';


export default function (url, options, timeout = 10000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeout)
    )
  ]);
}
