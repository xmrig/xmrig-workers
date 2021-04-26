'use strict';

import React from 'react';
import AsyncModal from './AsyncModal';
import {Header, Footer, Cancel, Title, Modal} from './Modal';
import {showModal} from "../../app/modals";
import {MODAL_OCL_PLATFORM} from "../../constants/ModalTypes";


export default class OclPlatformModal extends AsyncModal {
  static show(platform) {
    return showModal(MODAL_OCL_PLATFORM, platform);
  }


  render() {
    return (
      <Modal>
        <Header dismiss={this.props.dismiss}>
          <Title>OpenCL platform</Title>
        </Header>
        <div className="modal-body p-0">
          <table className="table table-hover table-sm mb-0">
            <tbody>
              <tr>
                <td className="border-top-0 text-muted pl-3" style={{width: 120}}>index</td>
                <td className="border-top-0"><span className="badge badge-dark">{this.props.index}</span></td>
              </tr>
              <tr>
                <td className="text-muted pl-3" style={{width: 120}}>name</td>
                <td>{this.props.name}</td>
              </tr>
              <tr>
                <td className="text-muted pl-3" style={{width: 120}}>version</td>
                <td>{this.props.version}</td>
              </tr>
              <tr>
                <td className="text-muted pl-3" style={{width: 120}}>vendor</td>
                <td>{this.props.vendor}</td>
              </tr>
              <tr>
                <td className="text-muted pl-3" style={{width: 120}}>extensions</td>
                <td className="text-muted">{this.props.extensions}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Footer>
          <Cancel dismiss={this.props.dismiss} />
        </Footer>
      </Modal>
    );
  }
}
