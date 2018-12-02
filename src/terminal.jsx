import React from 'react';
import {Socket} from 'net';
import {parse as parseTelnet, convertToNames as convertTelnetToNames} from './telnet';
import {parse as parseANSI, convertToNames as convertANSIToNames, convertToString as convertANSIToString} from './ansi';
import {getASCIICode} from './ascii';

export default class Terminal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {buffer: ''};
    this.socket = new Socket();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    const self = this;

    this.socket.on('data', (bytes) => {
      if (bytes === undefined)
        return;

      console.debug('bytes received:', bytes);

      let messages = [{type: 'raw', bytes: bytes}];

      messages = [].concat(...messages.map(parseTelnet));
      messages = [].concat(...messages.map(parseANSI));

      messages.forEach(message => {
        switch (message.type) {
          case 'telnet':
            console.debug('bytes parsed:', message.type, convertTelnetToNames(message.bytes), message.bytes);
            break;
          case 'ansi':
            console.debug('bytes parsed:', message.type, convertANSIToNames(message.bytes), convertANSIToString(message.bytes), message.bytes);
            break;
          default:
            console.debug('bytes parsed:', message.type, `"${message.bytes.toString()}"`, message.bytes);
            break;
        }
      });

      messages.filter(message => message.type === 'raw')
        .forEach(message => {
          for (const byte of message.bytes) {
            if (byte === 8) {
              self.setBuffer(this.state.buffer.slice(0, this.state.buffer.length - 1));
            } else {
              self.setBuffer(this.state.buffer + String.fromCharCode(byte));
            }
          }
        });
    });

    this.socket.on('close', () => {
      console.debug('socket closed');
      console.info('disconnected');
    });

    let port = 23;
    console.info('connecting to:', this.props.host, port);
    this.socket.connect(port, this.props.host, () => {
      console.debug('socket opened to:', this.props.host, port);
      console.info('connected');
    });
  }

  setBuffer(buffer) {
    if (buffer !== this.state.buffer) {
      this.setState({buffer: buffer});
    }
  }

  handleKeyDown(event) {
    event.preventDefault();
    let asciiCode = getASCIICode(event.nativeEvent);
    this.socket.write(Buffer.from([asciiCode]));
  }

  render() {
    let style = {
      fontFamily: "Consolas, monospace",
      fontSize: "1.25em",
      width: "48.5em",  // hack for 80 columns
      height: "35em",   // hack for 30 rows
      padding: "5px",
      border: "0",
      backgroundColor: "black",
      color: "white"
    };

    return (
      <div>
        <textarea style={style} onKeyDown={this.handleKeyDown} value={this.state.buffer}/>
      </div>
    )
  }
}
