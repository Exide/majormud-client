const { app, BrowserWindow } = require('electron');
const path = require('path');

// needs to be global so its not garbage collected
let mainWindow;

app.on('ready', async () => {
  const windowOptions = {
    width: 996,
    height: 730,
    webPreferences: {
      nodeIntegration: true
    }
  };

  mainWindow = new BrowserWindow(windowOptions);

  const indexHTML = path.resolve(__dirname, 'index.html');
  await mainWindow.loadFile(indexHTML);

  if (process.env.NODE_ENV === 'development') {
    const devToolsOptions = {
      mode: 'detach',
      activate: false
    };

    mainWindow.webContents.openDevTools(devToolsOptions);
  }

  mainWindow.on('closed', () => mainWindow = null);
});

app.on('window-all-closed', app.quit);
