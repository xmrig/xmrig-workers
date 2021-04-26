'use strict';

import React from 'react';
import bs58 from 'bs58';
import isArray from 'lodash/isArray';
import v1 from '../app/serialization/v1';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {SETTINGS_KEY} from "../app/settings";
import {STORAGE_KEY} from "../app/Workers";


export default class Import extends React.PureComponent {
  constructor(props) {
    super(props);

    this.data = Import.deserialize(props.import_data);

    console.log(this.data);
  }


  render() {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          <Icon icon="exclamation-triangle" className="text-danger" /> All your settings and workers will be replaced.
        </div>

        <button disabled={!this.isValid()} className="btn btn-primary" onClick={this.apply}>Import</button>
      </div>
    );
  }


  isValid() {
    return this.data && this.data.settings && this.data.workers && this.data.workers.length;
  }


  apply = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.data.settings));
    localStorage.setItem(STORAGE_KEY,  JSON.stringify(this.data.workers));

    window.location.pathname = '/';
  };


  static deserialize(input) {
    let array;
    try {
      array = JSON.parse(bs58.decode(input));
    }
    catch (e) {
      console.error(e);
      return {}
    }

    if (!isArray(array)) {
      return {}
    }

    if (array[0] === 1) {
      return v1.deserialize(array);
    }

    return null;
  }
}
