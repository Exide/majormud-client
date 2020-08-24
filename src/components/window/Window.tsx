import { remote, BrowserWindow } from 'electron';
import { Component } from 'react';

import './Window.css';

export default class Window extends Component {

  protected electronWindow: BrowserWindow;

  constructor() {
    super(undefined);

    this.minimize = this.minimize.bind(this);
    this.maximize = this.maximize.bind(this);
    this.restore = this.restore.bind(this);
    this.close = this.close.bind(this);
    this.toggleMaximize = this.toggleMaximize.bind(this);

    this.electronWindow = remote.getCurrentWindow();
    this.electronWindow.on('maximize', this.toggleMaximize);
    this.electronWindow.on('unmaximize', this.toggleMaximize);
  }

  minimize(): void {
    this.electronWindow.minimize();
  }

  maximize(): void {
    this.electronWindow.maximize();
  }

  restore(): void {
    this.electronWindow.unmaximize();
  }

  close(): void {
    this.electronWindow.close();
  }

  isMaximized(): boolean {
    return this.electronWindow.isMaximized();
  }

  toggleMaximize(): void {
    const domWindow = document.getElementById('window');
    if (this.electronWindow.isMaximized()) {
      domWindow.classList.add('maximized');
    } else {
      domWindow.classList.remove('maximized');
    }
  }

}
