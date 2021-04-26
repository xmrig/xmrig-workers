'use strict';

import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import Hashrate from "./labels/Hashrate";
import {getSettings, saveSettings} from "../../app/settings";
import cn from "classnames";


function renderHashrate(hashrate) {
  if (!hashrate) {
    return;
  }

  return (
    <div className="float-right mr-3">
      <small className="text-muted">10s</small> <Hashrate value={hashrate[0]} />{' '}
      <small className="text-muted">1m</small> <Hashrate value={hashrate[1]} />{' '}
      <small className="text-muted">15m</small> <Hashrate value={hashrate[2]} />{' '}
    </div>
  );
}


function renderTemperature(temperature) {
  if (temperature < 60) {
    return <span className="text-success">{temperature}</span>;
  }

  return temperature > 85 ? <span className="text-danger">{temperature}</span> : <span className="text-warning">{temperature}</span>
}


export default class CudaBackend extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { page: getSettings().cudaPage || 0 }
  }


  render() {
    const { cuda } = this.props;
    cuda.threads   = cuda.threads || [];
    const health   = cuda.threads.filter(thread => !!thread.health);

    return (
      <div className="card mb-3">
        <h5 className="card-header card-header">
          CUDA

          <div className="btn-group float-right">
            <button className="btn btn-outline-primary" onClick={this.props.onRefresh} title="Refresh"><Icon icon="sync-alt" /></button>
          </div>
          {renderHashrate(cuda.hashrate)}
        </h5>
        <div className="card-body">
          <div className="d-flex flex-wrap">
            <div className="mr-4">
              <span className="text-muted">profile</span><br />
              <span className="badge badge-primary">{cuda.profile}</span> <span className="badge badge-dark">{cuda.algo}</span>
            </div>
            <div className="mr-4">
              <span className="text-muted">versions</span><br />
              <b className="text-success">{cuda.versions.driver || ''}</b>{' '}
              <span title="Runtime/Driver/Plugin">{cuda.versions['cuda-runtime']}/{cuda.versions['cuda-driver']}/{cuda.versions.plugin}</span>
            </div>
          </div>
        </div>

        <ul className="nav nav-tabs pl-3">
          <li className="nav-item">
            <a className={cn('nav-link', { active: this.state.page === 0 })} onClick={this.handleChangePage} href="#">
              Threads <span className="badge badge-dark">{cuda.threads.length}</span>
            </a>
          </li>
          <li className="nav-item">
            <a className={cn('nav-link', { active: this.state.page === 1 })} onClick={this.handleChangePage} href="#">
              Health <span className="badge badge-dark">{health.length}</span>
            </a>
          </li>
        </ul>

        {this.renderThreads(cuda)}
        {this.renderHealth(health)}

      </div>
    );
  }


  renderThreads(cuda) {
    if (this.state.page !== 0) {
      return;
    }

    return (
      <div className="table-responsive">
        <table className="table table-hover table-sm table-striped mb-0">
          <thead>
          <tr>
            <th className="border-0 pl-4">#</th>
            <th className="border-0 font-weight-normal">index</th>
            <th className="border-0 font-weight-normal">bus id</th>
            <th className="border-0 font-weight-normal">smx</th>
            <th className="border-0 font-weight-normal">name</th>
            <th className="border-0 font-weight-normal">threads</th>
            <th className="border-0 font-weight-normal">blocks</th>
            <th className="border-0 font-weight-normal">affinity</th>
            <th className="border-0 font-weight-normal">10s</th>
            <th className="border-0 font-weight-normal">1m</th>
            <th className="border-0 font-weight-normal">15m</th>
          </tr>
          </thead>
          <tbody>
          {cuda.threads.map((thread, index) =>
            <tr key={index}>
              <td className="pl-4">{index}</td>
              <td>{thread.index}</td>
              <td>{thread.bus_id}</td>
              <td>{thread.smx}</td>
              <td>{thread.name}</td>
              <td>{thread.threads}</td>
              <td>{thread.blocks}</td>
              <td>{thread.affinity}</td>
              <td><Hashrate value={thread.hashrate[0]} /></td>
              <td><Hashrate value={thread.hashrate[1]} /></td>
              <td><Hashrate value={thread.hashrate[2]} /></td>
            </tr>)}
          </tbody>
        </table>
      </div>
    );
  }


  renderHealth(health) {
    if (this.state.page !== 1) {
      return;
    }

    return (
      <div className="table-responsive">
        <table className="table table-hover table-sm table-striped mb-0">
          <thead>
          <tr>
            <th className="border-0 pl-4">#</th>
            <th className="border-0 font-weight-normal">index</th>
            <th className="border-0 font-weight-normal">bus id</th>
            <th className="border-0 font-weight-normal">name</th>
            <th className="border-0 font-weight-normal"><b>W</b>atts</th>
            <th className="border-0 font-weight-normal"><b>°C</b></th>
            <th className="border-0 font-weight-normal"><b>MHz</b></th>
            <th className="border-0 font-weight-normal">fans <b>%</b></th>
          </tr>
          </thead>
          <tbody>
          {health.map((thread, index) =>
            <tr key={index}>
              <td className="pl-4">{index}</td>
              <td>{thread.index}</td>
              <td>{thread.bus_id}</td>
              <td>{thread.name}</td>
              <td className="font-weight-bold">{thread.health.power}</td>
              <td className="font-weight-bold">{renderTemperature(thread.health.temperature)}</td>
              <td>{thread.health.clock}/{thread.health.mem_clock}</td>
              <td>{thread.health.fan_speed.join(', ')}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    );
  }


  handleChangePage = event => {
    event.preventDefault();

    const page = this.state.page === 0 ? 1 : 0;

    this.setState({ page });
    saveSettings({...getSettings(), cudaPage: page});
  }
}
