import * as React from 'react';
import { Component, ReactElement } from 'react';
import { Session } from './session';

const address = 'mud.nocturnalreign.org';
const port = 55999;

export class App extends Component {

  render(): ReactElement {
    return <Session address={address} port={port}/>
  }

}
