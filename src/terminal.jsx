import React from 'react';
import {Socket} from 'net';
import {parse as parseTelnet, convertToNames as convertTelnetToNames} from './telnet';
import {parse as parseANSI, convertToNames as convertANSIToNames, convertToString as convertANSIToString} from './ansi';
import {keyCodeFromJSEvent} from './ascii';

export default class Terminal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {buffer: ''};
    this.socket = new Socket();
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    const self = this;

    this.socket.on('data', (bytes) => {
      if (bytes === undefined)
        return;

      console.log('-----');
      console.log('bytes:', bytes);

      let messages = [{type: 'raw', bytes: bytes}];

      messages = [].concat(...messages.map(parseTelnet));
      messages = [].concat(...messages.map(parseANSI));

      messages.forEach(message => {
        switch (message.type) {
          case 'telnet':
            console.log(message.type, convertTelnetToNames(message.bytes), message.bytes);
            break;
          case 'ansi':
            console.log(message.type, convertANSIToNames(message.bytes), convertANSIToString(message.bytes), message.bytes);
            break;
          default:
            console.log(message.type, `"${message.bytes.toString()}"`, message.bytes);
            break;
        }
      });

      let text = messages
        .filter(message => message.type === 'raw')
        .map(message => message.bytes.toString())
        .join('');

      let newBuffer = this.state.buffer + text;
      if (newBuffer !== this.state.buffer) {
        self.setState({buffer: newBuffer});
      }
    });

    this.socket.on('close', () => {
      console.log('socket closed');
    });

    console.log('connecting to:', this.props.host, 23);
    this.socket.connect(23, this.props.host, () => {
      console.log('socket opened');
    });
  }

  handleKeyUp(event) {
    event.preventDefault();
    let asciiCode = keyCodeFromJSEvent(event);
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
        <textarea style={style} onKeyUp={this.handleKeyUp} value={this.state.buffer}/>
      </div>
    )
  }
}
