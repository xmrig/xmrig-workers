'use strict';

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NoMatch from "./components/NoMatch";
import WorkersContainer from './containers/WorkersContainer';
import SettingsContainer from './containers/SettingsContainer';
import ModalContainer from './containers/ModalContainer';
import ImportContainer from './containers/ImportContainer';
import NavbarContainer from './containers/NavbarContainer';
import WorkerContainer from "./containers/WorkerContainer";


const routes = () => {
  return (
    <div>
      <NavbarContainer />

      <Switch>
        <Route exact path="/" component={WorkersContainer} />
        <Route exact path="/worker" component={WorkerContainer} />
        <Route exact path="/worker/edit" component={WorkerContainer} />
        <Route exact path="/worker/config" component={WorkerContainer} />
        <Route exact path="/worker/tools" component={WorkerContainer} />
        <Route exact path="/worker/backends" component={WorkerContainer} />
        <Route exact path="/worker/dev" component={WorkerContainer} />
        <Route exact path="/settings" component={SettingsContainer} />
        <Route exact path="/import/:import_data" component={ImportContainer} />
        <Route component={NoMatch} />
      </Switch>

      <ModalContainer />
    </div>
  );
};

export default routes;
