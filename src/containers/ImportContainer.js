'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Import from '../components/Import';


const ImportContainer = ({ import_data, dispatch }) => (
  <Import import_data={import_data} dispatch={dispatch} />
);


const mapStateToProps = (state, ownProps) => ({
  import_data: ownProps.match.params.import_data,
});


export default connect(mapStateToProps)(ImportContainer);
