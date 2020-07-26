import React, { Component, ReactElement, SyntheticEvent } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import './ServerConnectForm.css';

export interface ServerConnectFormState {
  hostname: string
  port: number
  submitted: boolean
}

export default class ServerConnectForm extends Component<RouteComponentProps, ServerConnectFormState> {

  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      hostname: '',
      port: 23,
      submitted: false
    };

    this.handleHostnameChange = this.handleHostnameChange.bind(this);
    this.handlePortChange = this.handlePortChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleHostnameChange(event: SyntheticEvent): void {
    const element = event.target as HTMLInputElement;
    this.setState({ hostname: element.value });
  }

  handlePortChange(event: SyntheticEvent): void {
    const element = event.target as HTMLInputElement;
    this.setState({ port: parseInt(element.value) });
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
            pathname: `/session-id-goes-here}`,
            state: {
              hostname: this.state.hostname,
              port: this.state.port
            }
          }}
        />
      );
    } else {
      return (
        <form id='server-connect-form' onSubmit={this.handleSubmit}>
          <fieldset>

            <legend className='visually-hidden'>Server address</legend>

            <label htmlFor='hostname' className='visually-hidden'>Hostname:</label>
            <input
              type='text'
              id='hostname'
              name='hostname'
              required
              placeholder='hostname'
              value={this.state.hostname}
              onChange={this.handleHostnameChange}
            />

            <label htmlFor='port' className='visually-hidden'>Port:</label>
            <input
              type='number'
              id='port'
              name='port'
              required
              placeholder='port'
              min='0'
              max='65535'
              value={this.state.port}
              onChange={this.handlePortChange}
            />

            <button type='submit'>
              connect
            </button>

          </fieldset>
        </form>
      );
    }
  }

}
