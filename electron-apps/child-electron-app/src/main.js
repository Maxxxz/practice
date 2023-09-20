const { app, BrowserWindow, ipcMain, webContents, screen } = require('electron')
const path = require('path')

// 创建window的时候才撞见deeplink
module.exports.createChildWindow =  function createChildWindow () {
  const mainWin = new BrowserWindow({
    x: 100,
    y: 100,
    width: 1200,
    height: 800,
    icon: path.join(__dirname, "coms.png"),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
      nodeIntegration: true,
    }
  })

  mainWin.loadFile(path.join(__dirname, "asar.html"))
  mainWin.webContents.openDevTools()
}


// function createSubWindow (filePath) {
//   // console.log('webContents', webContents)
//   console.log('screen width', screen.getPrimaryDisplay().workAreaSize.width)
//   console.log('screen height', screen.getPrimaryDisplay().workAreaSize.height)
//   const screens = screen.getAllDisplays();
//   console.log('screen.getAllDisplays()', screens)

//   const win = new BrowserWindow({
//     // parent: mainWin,
//     modal: false,
//     width: 800,
//     height: 500,
//     icon: "./coms.png",
//     webPreferences: {
//       webSecurity: false,
//     }
//   })
//   const fileName = path.join(__dirname, filePath);
//   console.log('fileName', fileName)
//   win.webContents.loadFile(fileName)
//   win.setBounds({ x: 0, y: 0, width: 300, height: 300 })
//   // mainWin.webContents.loadURL('file://' + fileName)
//   win.webContents.openDevTools()
//   win.once('ready-to-show', () => {
//     win.show()
//   })

//   // window.open(path.join(__dirname, filePath))
// }

// ipcMain.on('onCreateSubWindow', (event, filePath) => {
//   console.log('ipcMain ondragstart', filePath)
//   createSubWindow(filePath)
// })


