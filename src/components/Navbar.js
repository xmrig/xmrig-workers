'use strict';

import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import AddWorkerModal from './modals/AddWorkerModal';


export default class Navbar extends React.PureComponent {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <Link className="navbar-brand mb-0 h1" to="/">
          <img src="/assets/img/xmrig_logo.svg" width={30} height={30} alt="XMRIG Proxy" className="d-inline-block align-top" />{' '}
          XMRIG
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbars">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbars">
          <ul className="navbar-nav mr-auto">
            <li className={cn('nav-item', { active: this.props.pathname === '/settings' })}>
              <Link className="nav-link nav-link-icon" to="/settings"><Icon icon="cog" size="lg" /></Link>
            </li>
          </ul>

          <ul className="navbar-nav flex-row d-none d-md-flex">
            <li className="nav-item">
              <a className="nav-link nav-link-icon" target="_blank" title="Twitter" href="https://twitter.com/xmrig_dev"><Icon icon={['fab', 'twitter']} size="lg" /></a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-link-icon" target="_blank" title="reddit" href="https://www.reddit.com/u/XMRig"><Icon icon={['fab', 'reddit']} size="lg" /></a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-link-icon" target="_blank" title="Telegram" href="https://t.me/xmrig"><Icon icon={['fab', 'telegram']} size="lg" /></a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-link-icon" target="_blank" title="GitHub" href="https://github.com/xmrig/xmrig"><Icon icon={['fab', 'github']} size="lg" /></a>
            </li>
          </ul>

          <ul className="navbar-nav flex-row">
            <button onClick={this.add} className="btn btn-success ml-md-3" type="button"><Icon icon="plus" /> Add</button>
          </ul>
        </div>

      </nav>
    );
  }


  add = () => {
    AddWorkerModal.show()
      .catch(err => null);
  }
}
