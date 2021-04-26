'use strict';

import React from 'react';


export default class LoadAverage extends React.PureComponent {
  render() {
    const { load_average, threads } = this.props;

    const p       = load_average[0] / threads;
    const color   = p > 0.7 ? (p >= 1.0 ? 'danger' : 'warning') : 'success';
    const percent = `${(p * 100).toFixed(1)}%`;

    return (
      <div className="text-monospace">
        <small className="label text-muted">load average</small><br />
        <div>
          <b className={`text-${color}`}>{load_average[0].toFixed(2)}</b> <span className="text-muted">{load_average[1].toFixed(2)} {load_average[2].toFixed(2)}</span>
        </div>
        <div className="progress" style={{ maxHeight: 6}} title={percent}>
          <div className={`progress-bar bg-${color}`} style={{width: percent}} />
        </div>
      </div>
    );
  }
}
