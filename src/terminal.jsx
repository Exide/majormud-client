import React from 'react';
import {Socket} from 'net';
import {parse as telnetParse} from './telnet';
import {parse as ansiParse} from './ansi';

export default class Terminal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      buffer: '',
      output: ''
    };

    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    const socket = new Socket();
    const self = this;

    socket.on('data', (data) => {
      if (data === undefined)
        return;

      data = telnetParse(data);
      data = ansiParse(data);

      let newBuffer = this.state.buffer + data.toString();
      if (newBuffer !== this.state.buffer) {
        self.setState({buffer: newBuffer});
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

  handleKeyUp(event) {
    event.preventDefault();
    let newOutput = this.state.output + event.key;
    if (newOutput !== this.state.output) {
      this.setState({output: newOutput});
    }
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
        <div>
          {this.state.output}
        </div>
      </div>
    )
  }
}
