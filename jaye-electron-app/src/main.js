const { app, BrowserWindow, ipcMain, webContents, screen } = require('electron')
const path = require('path')
const fs = require('fs')
const https = require('https')
require('./maxi.asar/main.js')
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


// function loadAsar(){
//     // 判断应用程序是否打包
//     if (app.isPackaged) {
//       // 获取asar文件的路径
//       const asarPath = path.join(__dirname, 'path/to/your.asar');
//       // 加载asar文件
//       mainWindow.loadURL(`file://${asarPath}`);
//     } else {
//       // 开发模式下加载本地文件
//       mainWindow.loadURL('http://localhost:3000');
//     }
// }

// app.whenReady().then(()=>{
//   // createMainWindow()
//   // registerDeepLink()
// });