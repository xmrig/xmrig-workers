'use strict';

import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import AsyncModal from './AsyncModal';
import {Header, Footer, Cancel, Title, LargeModal} from './Modal';
import {showModal} from "../../app/modals";
import {MODAL_DEL_WORKER} from "../../constants/ModalTypes";


export default class DeleteWorkerModal extends AsyncModal {
  static show(name) {
    return showModal(MODAL_DEL_WORKER, { name })
  }


  render() {
    return (
      <LargeModal>
        <Header dismiss={this.props.dismiss}>
          <Title>Delete worker</Title>
        </Header>
        <div className="alert alert-warning rounded-0 mb-0">
          <Icon icon="exclamation-triangle" className="text-danger" /> Are you sure you want to delete worker <b>{this.props.name}</b>?
        </div>
        <Footer>
          <button type="button" className="btn btn-danger" onClick={this.handleDelete}><Icon icon="trash-alt" /> Delete worker</button>
          <Cancel dismiss={this.props.dismiss} />
        </Footer>
      </LargeModal>
    );
  }


  handleDelete = event => {
    event.preventDefault();
    this.resolve();
  }
}
