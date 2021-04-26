'use strict';

import React from 'react';


export const Modal = ({ children }) => (
  <div className="modal-dialog">
    <div className="modal-content">
      {children}
    </div>
  </div>
);


export const LargeModal = ({ children }) => (
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      {children}
    </div>
  </div>
);


export const Header = ({ children, dismiss }) => (
  <div className="modal-header">
    {children}
    <button type="button" className="close" data-dismiss="modal">
      <span>&times;</span>
    </button>
  </div>
);


export const Title = ({ children }) => (
  <h5 className="modal-title">
    {children}
  </h5>
);


export const Body = ({ children }) => (
  <div className="modal-body">
    {children}
  </div>
);


export const Footer = ({ children }) => (
  <div className="modal-footer">
    {children}
  </div>
);


export const Cancel = ({ dismiss }) => (
  <button type="button" className="btn btn-secondary hidden-xs" onClick={dismiss}>Close</button>
);


export const Spinner = ({ enabled }) => {
  if (!enabled) {
    return null;
  }

  return <span><i className="fa fa-spinner fa-spin fa-lg text-muted"/> </span>;
};
