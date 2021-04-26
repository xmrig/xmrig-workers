'use strict';

import React from 'react';


export default class Hashrate extends React.PureComponent {
  render() {
    const { type, value } = this.props;

    if (!value || value < .01) {
      return <span className="badge badge-danger">n/a</span>;
    }

    return <span className={`badge badge-${type ? type : 'primary'}`}>{value.toFixed(2)}</span>
  }
}
