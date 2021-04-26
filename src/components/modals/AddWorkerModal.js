'use strict';

import React from 'react';
import URL from 'url';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import AsyncModal from './AsyncModal';
import { LargeModal, Header, Title, Body, Footer, Cancel } from './Modal';
import { MODAL_ADD_WORKER } from '../../constants/ModalTypes';
import {showModal} from "../../app/modals";
import Workers from "../../app/Workers";
import history from "../../store/history";


const STATE_IDLE = 1;
const STATE_WAIT = 2;
const STATE_ERR  = 3;


export default class AddWorkerModal extends AsyncModal {
  static show(url = '', token = '') {
    return showModal(MODAL_ADD_WORKER, { url, token })
      .then(worker => {
        history.push('/worker?url=' + encodeURIComponent(worker.url));
      });
  }


  constructor(props) {
    super(props);

    this.state = {
      state: STATE_IDLE,
      error: '',
      url:   props.url   || '',
      token: props.token || ''
    };
  }


  render() {
    return (
      <LargeModal>
        <Header dismiss={this.props.dismiss}>
          <Title>Add new worker</Title>
        </Header>
        <Body>

          <form onSubmit={this.submit}>
            <div className="form-group">
              <label htmlFor="url">URL</label>
              <input
                type="url"
                className="form-control autofocus"
                id="url"
                placeholder="http://"
                name="url"
                value={this.state.url}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="token">Access token</label>
              <input
                type="password"
                className="form-control"
                id="token"
                placeholder="Optional"
                name="token"
                value={this.state.token}
                onChange={this.handleChange}
              />
            </div>

            <input type="submit" className="d-none" />
          </form>

        </Body>
        <Footer>
          {this.renderError()}
          {this.renderSpinner()}
          <button type="button" className="btn btn-primary" onClick={this.submit} disabled={!this.isReady()}>
            <Icon icon="plus" /> Add worker
          </button>
          <Cancel dismiss={this.props.dismiss} />
        </Footer>
      </LargeModal>
    );
  }


  isReady() {
    if (this.state.state === STATE_WAIT) {
      return false;
    }

    const { protocol, host } = URL.parse(this.state.url);

    return (protocol === 'http:' || protocol === 'https:') && host;
  }


  renderSpinner() {
    if (this.state.state === STATE_WAIT) {
      return <Icon icon="spinner" spin size="lg" />;
    }
  }


  renderError() {
    if (this.state.state === STATE_ERR && this.state.error) {
      return <span className="text-danger"><Icon icon="exclamation-triangle" size="lg" /> {this.state.error}</span>
    }
  }


  submit = event => {
    event.preventDefault();

    if (!this.isReady()) {
      return false;
    }

    this.setState({ state: STATE_WAIT });

    Workers.add(this.state.url, this.state.token)
      .then(worker => {
        this.resolve(worker);
      })
      .catch(err => {
        this.setState({ state: STATE_ERR, error: err.message});
      });
  };


  handleChange = event => {
    this.setState({ state: STATE_IDLE, [event.target.name]: event.target.value });
  };
}
