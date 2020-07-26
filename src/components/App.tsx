import React, { Component, ReactElement } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ServerConnectForm from './ServerConnectForm';
import Session from './Session';

import './App.css';

export default class App extends Component {

  render(): ReactElement {
    return (
      <HashRouter>
        <Switch>
          <Route path='/' exact component={ServerConnectForm}/>
          <Route path='/:session' component={Session} />
        </Switch>
      </HashRouter>
    );
  }

}
