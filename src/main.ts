import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import * as config from '../config.json';

// needs to be global so its not garbage collected
let window;

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  console.debug('all windows closed; quitting application');
  app.quit();
});

function createWindow() {
  console.debug('electron ready; initializing application');

  const windowOptions: BrowserWindowConstructorOptions = {
    width: config.resolution.width,
    height: config.resolution.height,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  };

  window = new BrowserWindow(windowOptions);
  window.on('resize', handleResize);
  window.on('closed', handleClosed);

  window.loadFile('index.html');

  if (process.env.NODE_ENV === 'development') {
    window.webContents.openDevTools({
      mode: 'detach'
    });
  }

  const enabledExtensions = [ REACT_DEVELOPER_TOOLS ];
  installExtension(enabledExtensions)
    .then(name => console.debug(`extension installed: ${name}`))
    .catch(console.error);

}

function handleResize() {
  console.debug('main window resizing');
  const { width, height } = window.getBounds();
  config.resolution.width = width;
  config.resolution.height = height;
}

function handleClosed() {
  console.debug('main window closing');
  window = null;
}
