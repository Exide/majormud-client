import { remote } from 'electron';
import { Component } from 'react';

import './Window.css';

export default class Window extends Component {

  constructor() {
    super(undefined);

    this.minimize = this.minimize.bind(this);
    this.maximize = this.maximize.bind(this);
    this.restore = this.restore.bind(this);
    this.close = this.close.bind(this);
    this.toggleMaximize = this.toggleMaximize.bind(this);

    const electronWindow = remote.getCurrentWindow();
    electronWindow.on('maximize', this.maximize);
    electronWindow.on('unmaximize', this.restore);
  }

  minimize(): void {
    if (!remote.getCurrentWindow().isMinimized()) {
      console.debug('minimizing window');
      remote.getCurrentWindow().minimize();
    }
  }

  maximize(): void {
    if (!remote.getCurrentWindow().isMaximized()) {
      console.debug('maximizing window');
      remote.getCurrentWindow().maximize();
    }
  }

  restore(): void {
    if (remote.getCurrentWindow().isMaximized()) {
      console.debug('restoring window');
      remote.getCurrentWindow().unmaximize();
    }
  }

  close(): void {
    console.debug('closing window');
    remote.getCurrentWindow().close();
  }

  isMaximized(): boolean {
    return remote.getCurrentWindow().isMaximized();
  }

  toggleMaximize(): void {
    console.debug('toggle maximize');
    const domWindow = document.getElementById('window');
    if (this.isMaximized()) {
      this.restore();
      domWindow.classList.remove('maximized');
    } else {
      this.maximize();
      domWindow.classList.add('maximized');
    }
  }

}
