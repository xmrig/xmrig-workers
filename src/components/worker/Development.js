'use strict';

import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import Net from "../../app/Net";
import cn from 'classnames';


const STATE_IDLE = 0;
const STATE_DONE = 1;
const STATE_WAIT = 2;
const STATE_ERR  = 3;


export default class Development extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      method:   'GET',
      request:  '/1/summary',
      body:     '',
      text:     '',
      error:    '',
      ok:       true,
      state:    STATE_IDLE
    }
  }


  render() {
    return (
      <div>
        <div className="card mb-3">
          <h5 className="card-header">
            Create HTTP API request
            <button className="btn btn-primary float-right" onClick={this.handleSubmit}><Icon icon="paper-plane" /> Submit</button>
          </h5>
          <div className="card-body">

            <form onSubmit={this.handleSubmit}>

              <div className="form-row">
                <div className="form-group col-sm-2">
                  <label htmlFor="http-method">method</label>
                  <select className="form-control" id="http-method" name="method" value={this.state.method} onChange={this.handleChange}>
                    <option>GET</option>
                    <option>PUT</option>
                    <option>POST</option>
                    <option>DELETE</option>
                  </select>
                </div>

                <div className="form-group col-sm-4">
                  <label htmlFor="http-url">url</label>
                  <input
                    type="url"
                    className="form-control"
                    id="http-url"
                    value={this.props.url}
                    readOnly
                  />
                </div>

                <div className="form-group col-sm-6">
                  <label htmlFor="http-request">request</label>
                  <input
                    type="text"
                    className="form-control"
                    id="http-request"
                    name="request"
                    value={this.state.request}
                    onChange={this.handleChange}
                  />
                </div>

              </div>

              <div className="form-row">
                <div className="form-group col-sm-12 mb-0">
                  <label htmlFor="http-body">request body</label>
                  <textarea
                    className="form-control"
                    id="http-body"
                    name="body"
                    disabled={this.state.method === 'GET'}
                    value={this.state.body}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <input type="submit" className="d-none" />

            </form>

          </div>
        </div>

        <div className={cn('card', 'mb-3', { 'border-success': this.isSuccess() }, { 'border-danger': this.isError() })}>
          <h5 className={cn('card-header', { 'text-white': this.state.state !== STATE_IDLE }, { 'bg-success': this.isSuccess() }, { 'bg-danger': this.isError() })}>
            HTTP API response
          </h5>
          <div className="card-body">
            {this.renderResponse()}
          </div>
        </div>
      </div>
    );
  }


  renderResponse() {
    switch (this.state.state) {
      case STATE_DONE:
        return <pre className="mb-0">{this.state.text}</pre>;

      case STATE_WAIT:
        return <div className="text-center"><Icon icon="spinner" spin size="2x" /></div>;

      case STATE_ERR:
        return (
          <div className="text-center text-danger">
            <div><Icon icon="exclamation-triangle" size="2x" /></div>
            <div className="text-bold">{this.state.error}</div>
          </div>
        );
    }
  }


  isSuccess() {
    return this.state.state !== STATE_IDLE && this.state.ok;
  }


  isError() {
    return this.state.state !== STATE_IDLE && !this.state.ok;
  }


  query() {
    this.setState({ state: STATE_WAIT });

    const url = this.props.url + this.state.request;

    if (this.state.method === 'GET') {
      return Net.get(url, this.props.token);
    }

    return Net.query(this.state.method, url, this.props.token, this.state.body);
  }


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  handleSubmit = event => {
    event.preventDefault();

    return this.query()
      .then(res => {
        return res.text()
          .then(text => {
            this.setState({ state: STATE_DONE, text, ok: res.ok });
          });
      })
      .catch(err => {
        this.setState({ state: STATE_ERR, error: err.message, ok: false });
      });
  }
}
