const { app, BrowserWindow } = require('electron');
const config = require('../config.json');

// needs to be global so its not garbage collected
let mainWindow;

app.on('ready', async () => {
  console.debug('electron ready; initializing application');

  const mainWindowOptions = {
    width: config.resolution.width,
    height: config.resolution.height,
    webPreferences: {
      nodeIntegration: true
    }
  };

  mainWindow = new BrowserWindow(mainWindowOptions);
  await mainWindow.loadFile('index.html');

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools({
      mode: 'detach'
    });
  }

  mainWindow.on('closed', () => {
    console.debug('main window closing');
    mainWindow = null;
  });

});

app.on('window-all-closed', () => {
  console.debug('all windows closed; quitting application');
  app.quit();
});
