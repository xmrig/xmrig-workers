'use strict';


import fetch from './fetchWithTimeout';


class Net {
  static get(url, token) {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch(url, { headers });
  }


  static query(method, url, token, body) {
    return fetch(url, {
      method,
      body,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }
}


export default Net;
