'use strict';

import React from 'react';
import duration from "humanize-duration";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";


export default class Uptime extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { offset: 0 };
  }


  render() {
    const { value } = this.props;

    if (value === 0) {
      return <span>unknown</span>;
    }

    return <span title={value + 's'}>{duration(value * 1000 + this.state.offset)}</span>
  }


  componentDidMount() {
    this.interval = setInterval(() => this.setState({ offset: this.state.offset + 1000 }), 1000);
  }


  componentWillUnmount() {
    clearInterval(this.interval);
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ offset: 0 });
  }
}
