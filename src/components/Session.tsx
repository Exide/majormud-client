import { remote } from 'electron';
import React, { Component, ReactElement } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Socket } from 'net';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import * as config from '../../config.json';
import { parseByteStream } from '../message';
import { convertCP437toUTF8 } from '../characterEncodings';
import { parseDOMKeyInput } from '../input';

import '../../node_modules/xterm/css/xterm.css';
import './Session.css';

export interface SessionProps extends RouteComponentProps {
  host: string
  port: number
}

export interface SessionState {
  connected: boolean
}

class Session extends Component<SessionProps, SessionState> {

  private element: HTMLElement;
  private socket: Socket;
  private terminal: Terminal;
  private fitAddon: FitAddon;

  constructor(properties: SessionProps) {
    super(properties);

    this.state = {
      connected: false
    };

    this.socket = new Socket();
    this.terminal = new Terminal({
      fontSize: config.font.size,
      fontFamily: config.font.family,
      theme: {
        black: '#000000'  // default is 'white'
      }
    });

    this.fitAddon = new FitAddon();
    this.terminal.loadAddon(this.fitAddon);

    remote.getCurrentWindow().on('resize', this.onWindowResize.bind(this));
  }

  componentDidMount(): void {
    this.initializeTerminal();
    this.initializeSocket();
  }

  onWindowResize(): void {
    console.debug('window resizing');
    this.fitAddon.fit();
  }

  initializeSocket(): void {
    console.debug('initializing the socket');
    this.socket.on('data', this.onSocketData.bind(this));
    this.socket.on('close', this.onSocketClose.bind(this));

    const { host, port } = this.props.history.location.state as SessionProps;
    console.info(`connecting to ${host}:${port}`);
    this.socket.connect(port, host, this.onSocketConnect.bind(this));
  }

  initializeTerminal(): void {
    console.debug('initializing xterm terminal');
    this.terminal.onData(this.onTerminalData.bind(this));
    this.terminal.onKey(this.onTerminalKey.bind(this));
    this.terminal.open(this.element);
    this.fitAddon.fit();
  }

  componentWillUnmount(): void {
    console.debug('destroying xterm terminal');
    this.terminal.dispose();
  }

  onSocketConnect(): void {
    console.debug('socket connected');
    this.setState({ connected: true });
  }

  onSocketData(bytes: Buffer): void {
    if (bytes === undefined) return;

    console.debug('bytes received:', bytes);
    const unicodeBytes = bytes.map(convertCP437toUTF8);
    this.terminal.write(unicodeBytes);

    const messages = parseByteStream(bytes);
    console.debug('messages:', messages);

    const stateChanges = {};
    this.setState(stateChanges);
  }

  onSocketClose(): void {
    this.setState({ connected: false });
    console.debug('socket closed');
  }

  onTerminalData(event): void {
    console.debug('terminal data:', event);
  }

  onTerminalKey(event): void {
    console.debug('terminal key:', event);
    const key = event.domEvent.key;
    const buffer = parseDOMKeyInput(key);
    this.socket.write(buffer);
  }

  render(): ReactElement {
    return <div id='session' ref={e => this.element = e}/>
  }
}

export default withRouter(Session);
