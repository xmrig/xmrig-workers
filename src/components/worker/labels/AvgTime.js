'use strict';

import React from 'react';


export default class AvgTime extends React.PureComponent {
  render() {
    const { value } = this.props;

    if (value === 0) {
      return <span className="badge badge-info">n/a</span>;
    }

    const warning = value < 10 || value > 120;

    return <span className={`badge badge-${warning ? 'warning' : 'info'}`}>{value}s</span>
  }
}
