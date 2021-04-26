'use strict';

import React from 'react';
import AsyncModal from './AsyncModal';
import {Header, Footer, Cancel, Title, Modal} from './Modal';
import {showModal} from "../../app/modals";
import {MODAL_CPU} from "../../constants/ModalTypes";


export default class CpuModal extends AsyncModal {
  static show(cpu) {
    return showModal(MODAL_CPU, cpu);
  }


  render() {
    return (
      <Modal>
        <Header dismiss={this.props.dismiss}>
          <Title>{this.props.brand}</Title>
        </Header>
        <div className="modal-body p-0">
          <table className="table table-hover table-sm mb-0">
            <tbody>
              <tr>
                <td className="border-top-0 text-muted pl-3" style={{width: 120}}>features</td>
                <td className="border-top-0" colSpan={3}>
                  {CpuModal.renderFeature(this.props.x64, 'x64')}{' '}
                  {CpuModal.renderFeature(this.props.aes, 'AES')}{' '}
                  {CpuModal.renderFeature(this.props.avx2, 'AVX2')}
                </td>
              </tr>
              <tr>
                <td className="text-muted pl-3" style={{width: 120}}>cache</td>
                <td colSpan={3}>
                  <span className="text-muted">L2</span> <span className="badge badge-info">{(this.props.l2 / 1048576).toFixed(1)} MB</span>{' '}
                  <span className="text-muted">L3</span> <span className="badge badge-info">{(this.props.l3 / 1048576).toFixed(1)} MB</span>
                </td>
              </tr>
              <tr>
                <td className="text-muted pl-3" style={{width: 120}}>cores</td>
                <td><span className="badge badge-dark">{this.props.cores}</span></td>
                <td className="text-muted pl-3" style={{width: 120}}>threads</td>
                <td><span className="badge badge-dark">{this.props.threads}</span></td>
              </tr>
              <tr>
                <td className="text-muted pl-3" style={{width: 120}}>packages</td>
                <td><span className="badge badge-info">{this.props.packages}</span></td>
                <td className="text-muted pl-3" style={{width: 120}}>NUMA nodes</td>
                <td>{CpuModal.renderNuma(this.props.nodes)}</td>
              </tr>
              <tr>
                <td className="text-muted pl-3" style={{width: 120}}>backend</td>
                <td colSpan={3}>{this.props.backend}</td>
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


  static renderNuma(nodes) {
    if (nodes === 0) {
      return <span className="badge badge-warning">n/a</span>
    }

    return <span className="badge badge-info">{nodes}</span>
  }


  static renderFeature(enabled, label) {
    return <span className={`badge badge-${enabled ? 'success' : 'danger'}`}>{label}</span>
  }
}
