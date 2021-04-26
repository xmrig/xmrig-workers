'use strict';

import React from 'react';
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import cn from "classnames";


export default class Ping extends React.PureComponent {
  render() {
    const { value } = this.props;

    if (value === 0) {
      return <span className="badge badge-info"><Icon icon="infinity" /></span>;
    }

    return <span className={cn('badge', { 'badge-success': value < 100 }, { 'badge-warning': value >= 100 && value < 500 }, { 'badge-danger': value >= 500 })}>{value}ms</span>
  }
}
