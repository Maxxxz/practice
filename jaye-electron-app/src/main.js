const { app, BrowserWindow, ipcMain, webContents, screen } = require('electron')
const path = require('path')
const fs = require('fs')
const https = require('https')
// const notifier = require('node-mac-notifier');

const appName = 'MyApp';

// app.on('ready', () => {
//   notifier.getAppInfo(appName, (error, result) => {
//       if (error) {
//         console.error(`${appName} is not installed`);
//       } else {
//         console.log(`${appName} is installed`);
//       }
//   });
// });

function createMainWindow () {
  const mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
      nodeIntegration: true,
    }
  })

  mainWin.loadFile('index.html')
  mainWin.webContents.openDevTools()

}

app.whenReady().then(()=>{
  createMainWindow()
  // registerDeepLink()
});