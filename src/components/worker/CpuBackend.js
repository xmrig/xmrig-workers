'use strict';

import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import Hashrate from "./labels/Hashrate";


function renderHugePages(enabled, total) {
  if (enabled === 0) {
    return <b className="text-danger">{enabled}/{total} <span className="badge badge-danger">0%</span></b>;
  }

  if (enabled === total) {
    return <b className="text-success">{enabled}/{total} <span className="badge badge-success">100%</span></b>;
  }

  return <b className="text-warning">{enabled}/{total} <span className="badge badge-warning">{(enabled / total * 100.0).toFixed(0)}%</span></b>;
}


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


function getPriority(priority) {
  switch (priority) {
    case -1:
      return 'default';

    case 1:
      return 'below normal';

    case 2:
      return 'normal';

    case 3:
      return 'above normal';

    case 4:
      return 'high';

    case 5:
      return 'realtime';

    default:
      break;
  }

  return priority;
}


export default class CpuBackend extends React.PureComponent {
  constructor(props) {
    super(props);
  }


  render() {
    const { cpu } = this.props;
    cpu.threads   = cpu.threads || [];

    return (
      <div className="card mb-3">
        <h5 className="card-header card-header">
          CPU

          <div className="btn-group float-right">
            <button className="btn btn-outline-primary" onClick={this.props.onRefresh} title="Refresh"><Icon icon="sync-alt" /></button>
          </div>
          {renderHashrate(cpu.hashrate)}
        </h5>
        <div className="card-body d-flex flex-wrap">
          <div className="mr-4">
            <span className="text-muted">profile</span><br />
            <span className="badge badge-primary">{cpu.profile}</span> <span className="badge badge-dark">{cpu.algo}</span>
          </div>
          <div className="mr-4">
            <span className="text-muted">huge pages</span><br />
            {renderHugePages(cpu.hugepages[0], cpu.hugepages[1])}
          </div>
          <div className="mr-4">
            <span className="text-muted">memory</span><br />
            <b className="text-info">{cpu.memory / 1024} KB</b>
          </div>
          <div className="mr-4">
            <span className="text-muted">aes</span><br />
            {cpu['hw-aes'] ? <span className="text-success"><Icon icon="check-circle" /></span> : <span className="text-danger"><Icon icon="times-circle" /></span>}
          </div>
          <div className="mr-4">
            <span className="text-muted">asm</span><br />
            {cpu.asm ? <b className="text-success">{cpu.asm}</b> : <span className="text-danger"><Icon icon="times-circle" /></span>}
          </div>
          <div className="mr-4">
            <span className="text-muted">priority</span><br />
            {getPriority(cpu.priority)}
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-sm table-striped mb-0">
            <thead>
            <tr>
              <th className="border-bottom-0 pl-4"># <span className="badge badge-dark">{cpu.threads.length}</span></th>
              <th className="border-bottom-0 font-weight-normal">intensity</th>
              <th className="border-bottom-0 font-weight-normal">affinity</th>
              <th className="border-bottom-0 font-weight-normal">10s</th>
              <th className="border-bottom-0 font-weight-normal">1m</th>
              <th className="border-bottom-0 font-weight-normal">15m</th>
            </tr>
            </thead>
            <tbody>
            {cpu.threads.map((thread, index) =>
              <tr key={index}>
                <td className="pl-4">{index}</td>
                <td>{thread.intensity}</td>
                <td>{thread.affinity}</td>
                <td><Hashrate value={thread.hashrate[0]} /></td>
                <td><Hashrate value={thread.hashrate[1]} /></td>
                <td><Hashrate value={thread.hashrate[2]} /></td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
