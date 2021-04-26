'use strict';

import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';


export default class NoMatch extends React.PureComponent {
  render() {
    return (
      <div>
        <div className="container text-center text-danger">
          <p><Icon icon="exclamation-triangle" size="5x" /></p>
          <p className="text-bold">404 Not Found</p>
        </div>
      </div>
    );
  }
}
