'use strict';

import React from 'react';
import SettingsForm from "./forms/SettingsForm";
import {saveSettings} from "../app/settings";
import ExportModal from "./modals/ExportModal";


export default class Settings extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      interval: props.settings.interval
    }
  }


  render() {
    return (
      <div className="container">
        <h2>
          Settings <button className="btn btn-secondary float-right" onClick={this.export}>Export</button>
        </h2>
        <div className="card bg-light shadow-sm mb-4">
          <div className="card-body">
            <SettingsForm
              interval={this.state.interval}
              update={this.update}
              submit={this.save}
            />
          </div>
        </div>
      </div>
    );
  }


  update = state => {
    this.setState(state, () => saveSettings(this.state));
  };


  save = event => {
    event.preventDefault();

    saveSettings(this.state);
  };


  export = event => {
    event.preventDefault();

    ExportModal.show();
  };
}
