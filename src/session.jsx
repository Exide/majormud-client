import React from 'react';
import ReactDOM from 'react-dom';
import { Socket } from 'net';
import StreamParser from './parser'
import * as xterm from 'xterm';
import * as ascii from './ascii';
import config from '../config.json';

import '../node_modules/xterm/css/xterm.css';

export default class Session extends React.Component {

  constructor(props) {
    super(props);
    this.socket = new Socket();
    this.streamParser = new StreamParser();
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
  }

  onSocketData(bytes) {
    if (bytes === undefined) return;

    console.debug('bytes received:', bytes);
    this.terminal.write(bytes);
    const parsedBytes = this.streamParser.parse(bytes);
  }

  onSocketClose() {
    console.debug('socket closed');
  }

  onTerminalData(event) {
    console.debug('terminal data:', event);
  }

  onTerminalKey(event) {
    console.debug('terminal key:', event);
    const asciiCode = ascii.getCodeForEvent(event.domEvent);
    const bytes = Buffer.from([ asciiCode ]);
    this.socket.write(bytes);
  }

  render() {
    return <div/>
  }
}
