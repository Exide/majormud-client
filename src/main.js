const {app, BrowserWindow} = require('electron');

// needs to be global so its not garbage collected
let window;

app.on('ready', () => {
  window = new BrowserWindow({width: 1000, height: 800});
  window.loadURL('file://' + __dirname + '/../dist/index.html');
  window.webContents.openDevTools();
  window.on('closed', () => window = null);
});

app.on('window-all-closed', () => {
  app.quit();
});