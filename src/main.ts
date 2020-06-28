import { app, session, OnHeadersReceivedListenerDetails, HeadersReceivedResponse, BrowserWindow } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import * as config from '../config.json';

// needs to be global so its not garbage collected
let mainWindow;

app.on('ready', async () => {
  console.debug('electron ready; initializing application');

  if (process.env.NODE_ENV !== 'development') {
    session.defaultSession.webRequest.onHeadersReceived(setContentSecurityPolicy);
  }

  const mainWindowOptions = {
    width: config.resolution.width,
    height: config.resolution.height,
    webPreferences: {
      nodeIntegration: true
    }
  };

  mainWindow = new BrowserWindow(mainWindowOptions);
  mainWindow.on('resize', handleResize);
  mainWindow.on('closed', handleClosed);

  await mainWindow.loadFile('index.html');

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools({
      mode: 'detach'
    });
  }

});

function handleResize() {
  console.debug('main window resizing');
  const { width, height } = mainWindow.getBounds();
  config.resolution.width = width;
  config.resolution.height = height;
}

function handleClosed() {
  console.debug('main window closing');
  mainWindow = null;
}

app.on('window-all-closed', () => {
  console.debug('all windows closed; quitting application');
  app.quit();
});

app.whenReady().then(() => {
  const enabledExtensions = [ REACT_DEVELOPER_TOOLS ];
  installExtension(enabledExtensions)
    .then(name => console.debug(`extension installed: ${name}`))
    .catch(console.error);
});

function setContentSecurityPolicy(details: OnHeadersReceivedListenerDetails, callback: (response: HeadersReceivedResponse) => void) {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': `script-src 'self'`
    }
  })
}
