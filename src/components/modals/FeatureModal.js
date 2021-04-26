'use strict';

import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import AsyncModal from './AsyncModal';
import {Header, Footer, Cancel, Title, LargeModal} from './Modal';
import {showModal} from "../../app/modals";
import {MODAL_FEATURE} from "../../constants/ModalTypes";


export default class FeatureModal extends AsyncModal {
  static show() {
    return showModal(MODAL_FEATURE, {})
  }


  render() {
    return (
      <LargeModal>
        <Header dismiss={this.props.dismiss}>
          <Title>Missing feature</Title>
        </Header>
        <div className="alert alert-danger rounded-0 mb-0">
          <Icon icon="exclamation-triangle" className="text-danger" /> Update your miner to recent version to get this feature.
        </div>
        <Footer>
          <Cancel dismiss={this.props.dismiss} />
        </Footer>
      </LargeModal>
    );
  }
}
