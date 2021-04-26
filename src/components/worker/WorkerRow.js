'use strict';

import React from 'react';
import cn from "classnames";
import {Link} from "react-router-dom";
import Workers from "../../app/Workers";
import Hashrate from "./labels/Hashrate";
import AvgTime from "./labels/AvgTime";


export default class WorkerRow extends React.PureComponent {
  static STATUS_OK      = 1;
  static STATUS_WARNING = 2;
  static STATUS_ERROR   = 3;


  static getStatus(summary) {
    if (!summary || summary.status !== 200 || !summary.connection) {
      return this.STATUS_ERROR;
    }

    const { hashrate, results } = summary;
    if ((hashrate.total[0] === null || hashrate.total[0] < 0.1) || ((results.shares_total - results.shares_good) && !results.shares_good)) {
      return this.STATUS_WARNING;
    }

    const { uptime } = summary.connection;
    if (uptime === 0) {
      return this.STATUS_WARNING;
    }

    return this.STATUS_OK;
  }


  render() {
    const { name, url, version } = this.props.worker;
    const { summary }            = Workers.getSync(url);
    const status                 = WorkerRow.getStatus(summary);
    const error                  = status === WorkerRow.STATUS_ERROR;

    return (
      <tr className={cn({'table-warning': status === WorkerRow.STATUS_WARNING}, {'table-danger': error})}>
        <td style={{lineHeight: 1.3}}>
          <div>
            <Link className="font-weight-bold" to={'/worker?url=' + encodeURIComponent(url)}>{name}</Link>
          </div>
          <div>
            <span className="badge badge-primary">{!error && summary.kind !== 'miner' ? summary.kind : ''}</span>{' '}
            <span className="badge badge-info">{version}</span>{' '}
            <span className="badge badge-dark">{!error ? summary.algo : ''}</span>{' '}
            <small className="text-muted">{url.replace('http://', '')}</small>
          </div>
        </td>
        {WorkerRow.renderHashrate(summary, status)}
        {WorkerRow.renderResults(summary, status)}
        {WorkerRow.renderPool(summary, status)}
      </tr>
    );
  }


  static renderHashrate(summary, status) {
    if (status === WorkerRow.STATUS_ERROR || !summary.hashrate) {
      return WorkerRow.renderNA();
    }

    const { hashrate } = summary;

    return (
      <td style={{lineHeight: 1.3}}>
        <div className="d-flex flex-wrap text-monospace" >
          {WorkerRow.renderSingleHashrate('10s', hashrate.total[0])}
          {WorkerRow.renderSingleHashrate('1m', hashrate.total[1])}
          {WorkerRow.renderSingleHashrate('15m', hashrate.total[2])}
          {WorkerRow.renderSingleHashrate('highest', hashrate.highest, 'secondary')}
        </div>
      </td>
    );
  }


  static renderSingleHashrate(label, value, type) {
    return (
      <div className="pr-2">
        <small className="text-muted">{label}</small><br /><Hashrate value={value} type={type} />
      </div>
    );
  }


  static renderNA() {
    return (
      <td>
        <span className="badge badge-danger">n/a</span>
      </td>
    );
  }


  static renderResults(summary, status) {
    if (status === WorkerRow.STATUS_ERROR || !summary.connection) {
      return WorkerRow.renderNA();
    }

    const { results } = summary;
    const good  = results.shares_good;
    const bad   = results.shares_total - results.shares_good;

    return (
      <td style={{lineHeight: 1.3}}>
        <div className="d-flex flex-wrap text-monospace">
          <div className="pr-2">
            <small className="text-muted">count</small><br /><span className={`badge badge-${good ? 'success' : 'info'}`}>{good}</span>/
            <span className={`badge badge-${bad ? 'danger' : 'success'}`}>{bad}</span>
          </div>
          <div>
            <small className="text-muted">avg time</small><br /><AvgTime value={results.avg_time} />
          </div>
        </div>
      </td>
    );
  }


  static renderPool(summary, status) {
    if (status === WorkerRow.STATUS_ERROR || !summary.connection || summary.connection.uptime === 0) {
      return WorkerRow.renderNA();
    }

    const { pool, tls } = summary.connection;

    return (
      <td style={{lineHeight: 1.3}}>
        <b>{pool}</b><br />
        {tls ? <span className="badge badge-success">{tls}</span> : ''}{' '}
        <small className="text-muted">diff</small> <span className="badge badge-info">{summary.results.diff_current}</span>
      </td>
    );
  }
}



