'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Worker from "../components/worker/Worker";
import querystring from 'querystring';


const WorkerContainer = ({ pathname, search, url, token, worker, dispatch }) => (
  <Worker pathname={pathname} search={search} url={url} token={token} worker={worker} dispatch={dispatch} />
);


const mapStateToProps = state => {
  const { pathname, search } = state.router.location;
  const query = search ? querystring.parse(search.substring(1)) : {};

  return {
    pathname,
    search: query.url ? `?url=${encodeURIComponent(query.url)}` : '',
    url:    query.url || '',
    token:  query.token || '',
    worker: state.workers.values[query.url || ''] || {}
  };
};



export default connect(mapStateToProps)(WorkerContainer);
