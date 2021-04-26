'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Settings from '../components/Settings';


const SettingsContainer = ({ settings, dispatch }) => (
  <Settings settings={settings} dispatch={dispatch} />
);


const mapStateToProps = state => ({
  settings: state.settings
});


export default connect(mapStateToProps)(SettingsContainer);
