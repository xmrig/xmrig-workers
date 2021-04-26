'use strict';

import React from 'react';
import approx from 'human-format';


function size(value) {
  return approx(value, {scale: 'binary', unit: 'B', decimals: 1});
}


export default class RssMemory extends React.PureComponent {
  render() {
    const { total, resident_set_memory } = this.props.memory;

    const p       = resident_set_memory / total * 100;
    const color   = p > 50 ? (p > 80 ? 'danger' : 'warning') : 'success';
    const percent = `${p.toFixed(1)}%`;

    return (
      <div className="text-monospace">
        <small className="label text-muted">rss memory</small><br />
        <div>
          <b className={`text-${color}`}>{size(resident_set_memory)}</b><span className="text-muted">/{size(total)}</span>
        </div>
        <div className="progress" style={{ maxHeight: 6}} title={percent}>
          <div className={`progress-bar bg-${color}`} style={{width: percent}} />
        </div>
      </div>
    );
  }
}
