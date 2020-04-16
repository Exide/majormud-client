import React from 'react';
import ReactDOM from 'react-dom';
import { Socket } from 'net';
import StreamParser from '../parser'
import * as xterm from 'xterm';
import * as ascii from '../ascii';

import '../../node_modules/xterm/css/xterm.css';

export default class Terminal extends React.Component {

  constructor(props) {
    super(props);
    this.socket = new Socket();
    this.streamParser = new StreamParser();
    this.terminal = new xterm.Terminal({
      fontSize: 15,
      fontFamily: 'Consolas, monospace',
      theme: {
        black: '#000000'  // default is 'white'
      }
    });
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-find-dom-node
    this.element = ReactDOM.findDOMNode(this);

    this.socket.on('data', (bytes) => {
      if (bytes === undefined) return;

      console.debug('bytes received:', bytes);
      const parsedBytes = this.streamParser.parse(bytes);
      this.terminal.write(parsedBytes);
    });

    this.socket.on('close', () => {
      console.debug('socket closed');
    });

    const { host, port } = this.props;
    this.socket.connect(port, host, () => {
      console.debug('socket opened to:', host, port);
    });

    console.debug('initializing xterm terminal')
    this.terminal.onData(this.onTerminalData.bind(this));
    this.terminal.onKey(this.onTerminalKey.bind(this));
    this.terminal.open(this.element);
  }

  componentWillUnmount() {
    console.debug('destroying xterm terminal');
    this.terminal.destroy()
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
    return <div ref={this.element}/>;
  }
}
