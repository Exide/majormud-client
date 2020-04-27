import * as React from 'react';
import { Component } from 'react';
import { Session } from './session';

const address = 'mud.nocturnalreign.org';
const port = 55999;

export class App extends Component {

  render() {
    return <Session address={address} port={port}/>
  }

}
