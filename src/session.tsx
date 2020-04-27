import * as React from 'react';
import { Component } from 'react';
import { Socket } from 'net';
import StreamParser from './parser'
import * as xterm from 'xterm';
import * as ascii from './ascii';
import * as config from '../config.json';

import '../node_modules/xterm/css/xterm.css';

export interface SessionProperties {
  address: string
  port: number
}

export class Session extends Component<SessionProperties> {

  private element: HTMLElement;
  private socket: Socket;
  private streamParser: StreamParser;
  private terminal: xterm.Terminal;

  constructor(properties: SessionProperties) {
    super(properties);
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
    this.terminal.open(this.element);
  }

  componentWillUnmount() {
    console.debug('destroying xterm terminal');
    this.terminal.dispose();
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
    return <div ref={e => this.element = e}/>
  }
}
