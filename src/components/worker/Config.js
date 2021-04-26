'use strict';

import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import cn from "classnames";
import attempt from 'lodash/attempt';
import isError from 'lodash/isError';
import FileSaver from 'file-saver';
import Net from "../../app/Net";
import {showError, showSuccess} from "../../actions/notification";


export default class Config extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error:    !props.token,
      progress: true,
      config:   null
    };

    this.getData();
  }


  render() {
    const isValid      = this.isValid();
    const { progress } = this.state;
    const error        = this.state.error || !isValid;

    return (
      <div>
        <div className={cn('card', 'mb-3', { 'border-danger': error })}>
          <h5 className={cn('card-header', { 'text-white': error }, { 'bg-danger': error })}>
            JSON configuration
            <button className="btn btn-secondary float-right" onClick={this.handleDownload} disabled={error || progress}><Icon icon="download" /> Download</button>
            <button className="btn btn-primary float-right mr-2" onClick={this.handleApply} disabled={error || progress}><Icon icon="check" /> Apply</button>
          </h5>
          {this.renderBody(isValid)}
        </div>
      </div>
    );
  }


  renderBody(isValid) {
    if (this.state.error) {
      return Config.renderError();
    }

    if (this.state.progress) {
      return Config.renderSpinner();
    }

    return this.renderConfig(isValid);
  }


  renderConfig(isValid) {
    return (
      <div className="card-body">
        <form>
          <div className="form-group mb-0">
            <textarea
              className={cn('form-control', 'text-monospace', { 'is-invalid': !isValid })}
              id="json"
              rows="16"
              value={this.state.config}
              spellCheck={false}
              onChange={event => { this.setState({ config: event.target.value }); }}
            />
          </div>
        </form>
      </div>
    );
  }


  static renderSpinner() {
    return (
      <div className="card-body text-muted text-center">
        <Icon icon="spinner" spin size="3x" />
      </div>
    );
  }


  static renderError() {
    return (
      <div className="card-body text-danger">
        <Icon icon="exclamation-triangle" /> Remote configuration is not available.
      </div>
    );
  }


  isValid() {
    return !isError(attempt(() => JSON.parse(this.state.config)));
  }


  getData() {
    if (this.state.error) {
      return;
    }

    const { url, token } = this.props;

    return Net.get(url + '/1/config', token)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }

        return res.text();
      })
      .then(config => {
        this.setState({ config, progress: false, error: false });
      })
      .catch(e => this.setState({ progress: false, error: true }));
  }


  handleApply = event => {
    event.preventDefault();

    const { url, token } = this.props;

    return Net.query('PUT', url + '/1/config', token, this.state.config)
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }

        showSuccess('Configuration successfully applied.');
      })
      .catch(err => {
        showError('Failed to apply configuration.');
      });
  };


  handleDownload = event => {
    event.preventDefault();

    const blob = new Blob([this.state.config], {type: 'text/plain;charset=utf-8'});
    FileSaver.saveAs(blob, `config.json`, true);
  };
}
