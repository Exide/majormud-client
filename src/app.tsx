import * as React from 'react';
import { Component, ReactElement } from 'react';
import { Session } from './session';

const address = 'bbs.bearfather.net';
const port = 23;

export class App extends Component {

  render(): ReactElement {
    return <Session address={address} port={port}/>
  }

}
