'use strict';

import React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import Hashrate from "./labels/Hashrate";
import OclPlatformModal from "../modals/OclPlatformModal";
import {getSettings, saveSettings} from "../../app/settings";
import uniqBy from 'lodash/uniqBy';


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


function renderName(board, name) {
  if (board === name) {
    return <span>{name}</span>;
  }

  return <span>{board} <span className="text-muted">({name})</span></span>
}


function renderTemperature(temperature) {
  if (temperature < 60) {
    return <span className="text-success">{temperature}</span>;
  }

  return temperature > 85 ? <span className="text-danger">{temperature}</span> : <span className="text-warning">{temperature}</span>
}


export default class OclBackend extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { page: getSettings().oclPage || 0 }
  }


  render() {
    const { ocl } = this.props;
    const threads = ocl.threads || [];
    const devices = uniqBy(ocl.threads, 'index').length;

    return (
      <div className="card mb-3">
        <h5 className="card-header card-header">
          OpenCL

          <div className="btn-group float-right">
            <button className="btn btn-outline-primary" onClick={this.props.onRefresh} title="Refresh"><Icon icon="sync-alt" /></button>
          </div>
          {renderHashrate(ocl.hashrate)}
        </h5>
        <div className="card-body">
          <div className="d-flex flex-wrap">
            <div className="mr-4">
              <span className="text-muted">profile</span><br />
              <span className="badge badge-primary">{ocl.profile}</span> <span className="badge badge-dark">{ocl.algo}</span>
            </div>
            <div className="mr-4">
              <span className="text-muted">platform</span><br />
              <span><a href="#" onClick={this.handlePlatformClick}>{ocl.platform.name}</a></span>
            </div>
          </div>
        </div>

        <ul className="nav nav-tabs pl-3">
          <li className="nav-item">
            <a className={cn('nav-link', { active: this.state.page === 0 })} onClick={this.handleDevicesPage} href="#">
              Devices <span className="badge badge-dark">{devices}</span>
            </a>
          </li>
          <li className="nav-item">
            <a className={cn('nav-link', { active: this.state.page === 1 })} onClick={this.handleThreadsPage} href="#">
              Threads <span className="badge badge-dark">{threads.length}</span>
            </a>
          </li>
          <li className="nav-item">
            <a className={cn('nav-link', { active: this.state.page === 2 })} onClick={this.handleHealthPage} href="#">
              Health <span className="badge badge-dark">{devices}</span>
            </a>
          </li>
        </ul>

        {this.renderDevices(ocl, threads)}
        {this.renderThreads(ocl, threads)}
        {this.renderHealth(ocl, threads)}

      </div>
    );
  }


  renderDevices(ocl, threads) {
    if (this.state.page !== 0) {
      return;
    }

    const map = {};
    for (let thread of threads) {
      if (!map.hasOwnProperty(thread.index)) {
        map[thread.index] = {
          index:      thread.index,
          intensity:  [ thread.intensity ],
          threads:    thread.threads,
          hashrate:   { ...thread.hashrate },
          board:      thread.board,
          name:       thread.name,
          bus_id:     thread.bus_id,
          global_mem: thread.global_mem,
          cu:         thread.cu
        };
      }
      else {
        const device = map[thread.index];
        device.intensity.push(thread.intensity);
        device.hashrate[0] += thread.hashrate[0];
        device.hashrate[1] += thread.hashrate[1];
        device.hashrate[2] += thread.hashrate[2];
      }
    }

    const devices = Object.keys(map).map(index => map[index]);

    return (
      <div className="table-responsive">
        <table className="table table-hover table-sm table-striped mb-0">
          <thead>
          <tr>
            <th className="border-0 font-weight-normal pl-4">index</th>
            <th className="border-0 font-weight-normal">bus id</th>
            <th className="border-0 font-weight-normal">cu</th>
            <th className="border-0 font-weight-normal">name</th>
            <th className="border-0 font-weight-normal">intensity</th>
            <th className="border-0 font-weight-normal">affinity</th>
            <th className="border-0 font-weight-normal">10s</th>
            <th className="border-0 font-weight-normal">1m</th>
            <th className="border-0 font-weight-normal">15m</th>
          </tr>
          </thead>
          <tbody>
          {devices.map((device, index) =>
            <tr key={device.index}>
              <td className="pl-4">{device.index}</td>
              <td>{device.bus_id}</td>
              <td>{device.cu}</td>
              <td>{renderName(device.board, device.name)}</td>
              <td>{device.intensity.join('+')}</td>
              <td>{device.threads.join(', ')}</td>
              <td><Hashrate value={device.hashrate[0]} /></td>
              <td><Hashrate value={device.hashrate[1]} /></td>
              <td><Hashrate value={device.hashrate[2]} /></td>
            </tr>)}
          </tbody>
        </table>
      </div>
    );
  }

  renderThreads(ocl, threads) {
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
            <th className="border-0 font-weight-normal">intensity</th>
            <th className="border-0 font-weight-normal">worksize</th>
            <th className="border-0 font-weight-normal">affinity</th>
            <th className="border-0 font-weight-normal">10s</th>
            <th className="border-0 font-weight-normal">1m</th>
            <th className="border-0 font-weight-normal">15m</th>
          </tr>
          </thead>
          <tbody>
          {threads.map((thread, index) =>
            <tr key={index}>
              <td className="pl-4">{index}</td>
              <td>{thread.index}</td>
              <td>{thread.bus_id}</td>
              <td>{renderName(thread.board, thread.name)}</td>
              <td>{thread.intensity}</td>
              <td>{thread.worksize}</td>
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


  renderHealth(ocl, threads) {
    if (this.state.page !== 2) {
      return;
    }

    const devices = uniqBy(threads, 'index').filter(device => !!device.health);
    if (!devices.length) {
      return (
        <div className="alert alert-danger mb-0 border-0 rounded-0">
          <Icon icon="exclamation-triangle" /> Health information is not available.
        </div>
      )
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
            <th className="border-0 font-weight-normal"><b>RPM</b></th>
          </tr>
          </thead>
          <tbody>
          {devices.map((device, index) =>
            <tr key={index}>
              <td className="pl-4">{index}</td>
              <td>{device.index}</td>
              <td>{device.bus_id}</td>
              <td>{renderName(device.board, device.name)}</td>
              <td className="font-weight-bold">{device.health.power}</td>
              <td className="font-weight-bold">{renderTemperature(device.health.temperature)}</td>
              <td>{device.health.clock}/{device.health.mem_clock}</td>
              <td>{device.health.rpm}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    );
  }


  setPage(page) {
    this.setState({ page });

    saveSettings({...getSettings(), oclPage: page});
  }


  handlePlatformClick = event => {
    event.preventDefault();

    OclPlatformModal.show(this.props.ocl.platform);
  };


  handleDevicesPage = event => {
    event.preventDefault();

    this.setPage(0);
  };


  handleThreadsPage = event => {
    event.preventDefault();

    this.setPage(1);
  };


  handleHealthPage = event => {
    event.preventDefault();

    this.setPage(2);
  };
}
