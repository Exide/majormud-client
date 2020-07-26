import React, { Component, ReactElement, SyntheticEvent } from 'react';
import { remote, BrowserWindow } from 'electron';

import './Window.css';

export default class Window extends Component {

  private electronWindow: BrowserWindow;

  constructor(props) {
    super(props);

    this.handleMinimize = this.handleMinimize.bind(this);
    this.handleMaximize = this.handleMaximize.bind(this);
    this.handleRestore = this.handleRestore.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.toggleMaximize = this.toggleMaximize.bind(this);

    this.electronWindow = remote.getCurrentWindow();
    this.electronWindow.on('maximize', this.toggleMaximize);
    this.electronWindow.on('unmaximize', this.toggleMaximize);
  }

  handleMinimize(event: SyntheticEvent): void {
    this.electronWindow.minimize();
  }

  handleMaximize(event: SyntheticEvent): void {
    this.electronWindow.maximize();
  }

  handleRestore(event: SyntheticEvent): void {
    this.electronWindow.unmaximize();
  }

  handleClose(event: SyntheticEvent): void {
    this.electronWindow.close();
  }

  toggleMaximize(): void {
    const domWindow = document.getElementById('window');
    if (this.electronWindow.isMaximized()) {
      domWindow.classList.add('maximized');
    } else {
      domWindow.classList.remove('maximized');
    }
  }

  render(): ReactElement {
    return (
      <div id='window'>
        <div id='window-title-bar'>
          <span id='window-title'><img alt='MajorMUD Client' src={ require('../../resources/title.png') } /></span>
          <div id='minimize-button' className='window-control' onClick={this.handleMinimize}>&#xE921;</div>
          <div id='maximize-button' className='window-control' onClick={this.handleMaximize}>&#xE922;</div>
          <div id='restore-button' className='window-control' onClick={this.handleRestore}>&#xE923;</div>
          <div id='close-button' className='window-control' onClick={this.handleClose}>&#xE8BB;</div>
        </div>
        <div id='window-content'>
          { this.props.children }
        </div>
      </div>
    );
  }

}
