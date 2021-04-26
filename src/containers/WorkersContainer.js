'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Workers from '../components/Workers';


const WorkersContainer = ({ workers, dispatch }) => (
  <Workers workers={workers} dispatch={dispatch} />
);


const mapStateToProps = state => ({
  workers: state.workers
});


export default connect(mapStateToProps)(WorkersContainer);
