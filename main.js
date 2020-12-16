const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');
const isDev = require('electron-is-dev');
const SerialPort = require('serialport');
require('electron-reload');

let mainWindow;

const connectToSerial = () => {
  const port = new SerialPort(
    '/dev/ttyGS0',
    {
      baudRate: 115200,
    },
    (error) => {
      if (error) {
        console.log(error.message);
      }
    }
  );

  const parser = port.pipe(new Readline());

  parser.on('data', (data) => {
    console.log(`Data: ${data}`);
  });
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    fullscreen: true,
  });

  mainWindow.loadURL(`file://${path.join(__dirname, '/build/index.html')}`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  setTimeout(() => {
    mainWindow.webContents.send('message', {
      name: 'elonmusk',
      msg: 'EZ Clap',
    });
  }, 3000);

  mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
