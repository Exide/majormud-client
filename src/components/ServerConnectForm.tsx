import React, { Component, ReactElement, SyntheticEvent } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import './ServerConnectForm.css';

export interface ServerConnectFormState {
  address: string
  parsedHost: string
  parsedPort: number
  addressIsValid: boolean
  error: string
  submitted: boolean
}

export default class ServerConnectForm extends Component<RouteComponentProps, ServerConnectFormState> {

  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      address: '',
      parsedHost: '',
      parsedPort: 23,
      addressIsValid: false,
      error: '',
      submitted: false
    };

    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAddressChange(event: SyntheticEvent): void {
    const element = event.target as HTMLInputElement;
    const address = element.value;
    const { host, port } = this.extractAddressComponents(address);
    this.setState({
      address: address,
      parsedHost: host,
      parsedPort: port
    });
  }

  extractAddressComponents(address: string): { host: string, port: number } {
    const components = address.split(':');
    const host = components[0];
    const port = components.length > 1 ? parseInt(components[1]) : 23;
    return { host, port };
  }

  handleSubmit(event: SyntheticEvent): void {
    event.preventDefault();
    this.setState({ submitted: true });
  }

  render(): ReactElement {
    if (this.state.submitted) {
      return (
        <Redirect
          to={{
            pathname: `/session-id-goes-here`,
            state: {
              host: this.state.parsedHost,
              port: this.state.parsedPort
            }
          }}
        />
      );
    } else {
      return (
        <form
          id='server-connect-form'
          onSubmit={this.handleSubmit}
          className='panel'
        >

          <p>Enter the Telnet address of a MajorMUD server.</p>

          <label htmlFor='address' className='visually-hidden'>Address</label>
          <input
            type='text'
            id='address'
            name='address'
            required
            placeholder='host:port'
            value={this.state.address}
            onChange={this.handleAddressChange}
          />

          <button type='submit'>
            Connect
          </button>

        </form>
      );
    }
  }

}
