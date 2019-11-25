import { Socket } from 'net';
import React from 'react';
import * as ansi from './ansi';
import * as ascii from './ascii';
import * as telnet from './telnet';
import * as utils from './utils';

export default class Terminal extends React.Component {

  constructor(props) {
    super(props);
    this.state = { buffer: '' };
    this.socket = new Socket();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    const self = this;

    this.socket.on('data', (bytes) => {
      if (bytes === undefined) return;

      console.debug('bytes received:', bytes);

      const messages = [ utils.buildRawMessage(bytes) ]
        .flatMap(telnet.parse)
        .flatMap(ansi.parse);

      console.debug('messages received:', messages);

      messages.filter(message => message.type === 'raw')
        .forEach(message => {
          for (const byte of message.bytes) {
            switch (byte) {
              case ascii.Encoding.BS:
                self.setBuffer(this.state.buffer.slice(0, this.state.buffer.length - 1));
                break;

              case ascii.Encoding.LF:
                self.setBuffer(this.state.buffer + '<br/>');
                break;

              default:
                self.setBuffer(this.state.buffer + String.fromCharCode(byte));
            }
          }
        });
    });

    this.socket.on('close', () => {
      console.debug('socket closed');
      console.info('disconnected');
    });

    console.info('connecting to:', this.props.host, this.props.port);
    this.socket.connect(this.props.port, this.props.host, () => {
      console.debug('socket opened to:', this.props.host, this.props.port);
      console.info('connected');
    });
  }

  componentDidUpdate() {
    this.scrollToLatest();
  }

  scrollToLatest() {
    this.pointerToLatest.scrollIntoView();
  }

  setBuffer(buffer) {
    if (buffer !== this.state.buffer) {
      this.setState({ buffer });
    }
  }

  handleKeyDown(event) {
    event.preventDefault();
    let asciiCode = ascii.getCodeForEvent(event.nativeEvent);
    this.socket.write(Buffer.from([ asciiCode ]));
  }

  render() {
    return (
      <div>
        <div
          id="terminal"
          tabIndex="0"
          onKeyDown={this.handleKeyDown}
          dangerouslySetInnerHTML={{ __html: this.state.buffer }}
        />
        <div
          id="latest"
          ref={(e) => { this.pointerToLatest = e }}
          style={{ float: 'left', clear: 'both' }}
        />
      </div>
    );
  }
}
