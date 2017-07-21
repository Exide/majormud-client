import React from 'react';
import {Socket} from 'net';
import {parse as telnetParse} from './telnet';
import {parse as ansiParse} from './ansi';

export default class Terminal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      output: ''
    };
  }

  componentDidMount() {
    const socket = new Socket();
    const self = this;

    socket.on('data', (buffer) => {
      if (buffer === undefined)
        return;

      buffer = telnetParse(buffer);
      buffer = ansiParse(buffer);

      let newOutput = this.state.output + buffer.toString();
      if (newOutput !== this.state.output) {
        self.setState({output: newOutput});
      }
    });

    socket.on('close', () => {
      console.log('socket closed');
    });

    console.log('connecting to:', this.props.host, 23);
    socket.connect(23, this.props.host, () => {
      console.log('socket opened');
    });
  }

  render() {
    return (
      <div>
        {this.state.output}
      </div>
    )
  }
}
