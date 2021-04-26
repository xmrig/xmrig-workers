'use strict';

import React from 'react';


export default class SettingsForm extends React.PureComponent {
  render() {
    return (
      <form>

        <div className="form-group row mb-0">
          <label htmlFor="interval" className="col-lg-3 col-form-label">Refresh interval</label>
          <div className="col-lg-9">
            <div className="input-group" style={{ maxWidth: 256 }}>
              <input
                type="number"
                className="form-control"
                id="interval"
                min={1}
                value={this.props.interval}
                onChange={event => { this.props.update({ interval: +event.target.value }) }}
              />
              <div className="input-group-append">
                <span className="input-group-text">Seconds</span>
              </div>
            </div>
          </div>
        </div>

        <input type="submit" className="d-none" onClick={this.props.submit} />

      </form>
    );
  }
}
