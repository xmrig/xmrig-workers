'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';


const NavbarContainer = ({ groups, pathname, dispatch }) => (
  <Navbar groups={groups} pathname={pathname} dispatch={dispatch} />
);


const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  groups:   []
});


export default connect(mapStateToProps)(NavbarContainer);
