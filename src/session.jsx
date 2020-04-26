import React from 'react';
import ReactDOM from 'react-dom';
import { Socket } from 'net';
import * as xterm from 'xterm';
import ASCII from './ascii';
import Telnet from './telnet';
import ANSI from './ansi';
import config from '../config.json';

import '../node_modules/xterm/css/xterm.css';

export default class Session extends React.Component {

  constructor(props) {
    super(props);
    super(props);
    this.state = {
      connected: false
    };
    this.socket = new Socket();
    this.terminal = new xterm.Terminal({
      fontSize: config.font.size,
      fontFamily: config.font.family,
      theme: {
        black: '#000000'  // default is 'white'
      }
    });
  }

  componentDidMount() {
    this.initializeTerminal();
    this.initializeSocket();
  }

  initializeSocket() {
    console.debug('initializing the socket');
    this.socket.on('data', this.onSocketData.bind(this));
    this.socket.on('close', this.onSocketClose.bind(this));

    const { address, port } = this.props;
    console.info(`connecting to ${address}:${port}`);
    this.socket.connect(port, address, this.onSocketConnect.bind(this));
  }

  initializeTerminal() {
    console.debug('initializing xterm terminal');
    this.terminal.onData(this.onTerminalData.bind(this));
    this.terminal.onKey(this.onTerminalKey.bind(this));

    // eslint-disable-next-line react/no-find-dom-node
    const element = ReactDOM.findDOMNode(this);
    this.terminal.open(element);
  }

  componentWillUnmount() {
    console.debug('destroying xterm terminal');
    this.terminal.destroy()
  }

  onSocketConnect() {
    console.debug('socket connected');
    this.setState({ connected: true });
  }

  onSocketData(bytes) {
    if (bytes === undefined) return;

    console.debug('bytes received:', bytes);
    this.terminal.write(bytes);
    const events = buildEventsFromBytes(bytes);
    const stateChanges = getStateChangesFromEvents(events);
    this.setState(stateChanges);
  }

  onSocketClose() {
    this.setState({ connected: false });
    console.debug('socket closed');
  }

  onTerminalData(event) {
    console.debug('terminal data:', event);
  }

  onTerminalKey(event) {
    console.debug('terminal key:', event);
    const asciiCode = ASCII.getCodeForEvent(event.domEvent);
    const bytes = Buffer.from([ asciiCode ]);
    this.socket.write(bytes);
  }

  render() {
    return <div/>
  }
}

function buildEventsFromBytes(bytes) {
  return [ { type: 'raw', bytes } ]
    .map(Telnet.parse)
    .map(ANSI.parse);
}

function getStateChangesFromEvents(events) {

}
