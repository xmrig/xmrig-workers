'use strict';

import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import Workers from "../../app/Workers";
import DeleteWorkerModal from "../modals/DeleteWorkerModal";
import history from "../../store/history";
import {showError, showSuccess} from "../../actions/notification";


export default class Edit extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      url:   props.url,
      token: props.token
    }
  }


  render() {
    return (
      <div>
        <div className="card mb-3">
          <h5 className="card-header">
            Edit worker
            <button className="btn btn-danger float-right" onClick={this.handleDelete}><Icon icon="trash-alt" /></button>
            <button className="btn btn-primary float-right mr-2" onClick={this.handleSubmit}><Icon icon="check" /> Apply</button>
          </h5>
          <div className="card-body">

            <form onSubmit={this.handleSubmit}>
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

          </div>
        </div>
      </div>
    );
  }


  handleSubmit = event => {
    event.preventDefault();

    Workers.update(this.state.url, this.state.token, this.props.url)
      .then(worker => {
        if (this.props.url !== worker.url) {
          history.push('/worker/edit?url=' + encodeURIComponent(worker.url));
        }

        showSuccess('Worker was successfully changed.');
      })
      .catch(err => {
        showError(err.message);
      });
  };


  handleDelete = event => {
    DeleteWorkerModal.show(this.props.name)
      .then(() => {
        Workers.remove(this.props.url);
        history.push('/');
      })
      .catch(err => {
        if (err.message === 'dismiss') {
          return;
        }
        console.log(err);
      })
  };


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
}
