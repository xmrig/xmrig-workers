'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as types from '../constants/ModalTypes';
import { dismiss } from  '../actions/modals';


const MODALS = {
  [types.MODAL_ADD_WORKER]:    require('../components/modals/AddWorkerModal').default,
  [types.MODAL_DEL_WORKER]:    require('../components/modals/DeleteWorkerModal').default,
  [types.MODAL_EXPORT]:        require('../components/modals/ExportModal').default,
  [types.MODAL_CPU]:           require('../components/modals/CpuModal').default,
  [types.MODAL_FEATURE]:       require('../components/modals/FeatureModal').default,
  [types.MODAL_OCL_PLATFORM]:  require('../components/modals/OclPlatformModal').default
};


class ModalContainer extends React.PureComponent {
  render() {
    return <div className="modal fade" ref="modal" tabIndex="-1">{this.renderModal()}</div>;
  }


  renderModal() {
    const Component = MODALS[this.props.type];
    if (!Component) {
      return;
    }

    const props = {...this.props.data, dismiss: this.dismiss};
    return <Component {...props} />;
  }


  componentDidMount() {
    this.$modal = $(this.refs.modal);

    this.$modal.on('shown.bs.modal', () => {
      this.$modal.find('.autofocus').focus();
    });

    this.$modal.on('hidden.bs.modal', () => {
      this.props.dismiss();
    });
  }


  componentDidUpdate() {
    if (this.props.type !== types.MODAL_NONE) {
      this.$modal.modal('show');
    }
  }


  dismiss = () => {
    this.$modal.modal('hide');
  }
}


const mapStateToProps = state => ({
  type: state.modal.type,
  data: state.modal.data
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  dismiss: () => dispatch(dismiss())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContainer);
