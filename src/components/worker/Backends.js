'use strict';

import React from 'react';
import find from 'lodash/find';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import Net from "../../app/Net";
import {getSettings} from "../../app/settings";
import CpuBackend from "./CpuBackend";
import OclBackend from "./OclBackend";
import CudaBackend from "./CudaBackend";


export default class Backends extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error:    false,
      progress: true,
      backends: null
    };

    this.getData();
  }


  render() {
    return this.renderBody();
  }


  componentDidMount() {
    this.interval = setInterval(this.getData, getSettings().interval * 1000);
  }


  componentWillUnmount() {
    clearInterval(this.interval);
  }


  renderBody() {
    if (this.state.error) {
      return (<div className="alert alert-danger"><Icon icon="exclamation-triangle" /> Backends information is not available.</div>);
    }

    if (this.state.progress) {
      return (<div className="text-muted text-center"><Icon icon="spinner" spin size="3x" /></div>);
    }

    return (
      <div>
        {this.renderCPU()}
        {this.renderOCL()}
        {this.renderCUDA()}
      </div>
    );
  }


  renderCPU() {
    const cpu = find(this.state.backends, { type: 'cpu' });
    if (!cpu || !cpu.enabled) {
      return;
    }

    return <CpuBackend cpu={cpu} onRefresh={this.getData} />;
  }


  renderOCL() {
    const ocl = find(this.state.backends, { type: 'opencl' });
    if (!ocl || !ocl.enabled) {
      return;
    }

    return <OclBackend ocl={ocl} onRefresh={this.getData} />;
  }


  renderCUDA() {
    const cuda = find(this.state.backends, { type: 'cuda' });
    if (!cuda || !cuda.enabled) {
      return;
    }

    return <CudaBackend cuda={cuda} onRefresh={this.getData} />;
  }


  getData = () => {
    const { url, token } = this.props;

    return Net.get(url + '/2/backends', token)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }

        return res.json();
      })
      .then(backends => {
        this.setState({ backends, progress: false, error: false });
      })
      .catch(e => this.setState({ progress: false, error: true }));
  };
}
