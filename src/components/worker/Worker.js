'use strict';

import React from 'react';

import Sidebar from "./Sidebar";
import AddWorkerModal from "../modals/AddWorkerModal";
import history from "../../store/history";
import Development from "./Development";
import Edit from "./Edit";
import Summary from "./Summary";
import Config from "./Config";
import Backends from "./Backends";


export default class Worker extends React.PureComponent {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    if (!this.props.worker.name) {
      AddWorkerModal.show(this.props.url, this.props.token)
        .catch(err => history.push('/'));
    }
  }


  render() {
    return (
      <div className="container-fluid">
        <div className="d-flex">
          <div className="mr-3">
            <Sidebar name={this.props.worker.name} pathname={this.props.pathname} search={this.props.search} />
          </div>
          <div className="flex-grow-1">
            {this.renderBody()}
          </div>
        </div>
      </div>
    );
  }


  renderBody() {
    const { url } = this.props;
    const { token, name, ts } = this.props.worker;

    switch (this.props.pathname) {
      case '/worker':
        return <Summary url={url} token={token} ts={ts} />;

      case '/worker/edit':
        return <Edit url={url} token={token} name={name} />;

      case '/worker/dev':
        return <Development url={url} token={token} />;

      case '/worker/config':
        return <Config url={url} token={token} />;

      case '/worker/backends':
        return <Backends url={url} token={token} />;

      default:
        break;
    }
  }
}
