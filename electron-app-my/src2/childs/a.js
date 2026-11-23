const { app, BrowserWindow, ipcMain, webContents, screen, dialog, utilityProcess } = require('electron')
const path = require('path')
require('./business/dragger.js');
require('./business/deeplink.js')

// utilityProcess.fork(path.join(__dirname, 'childs/a.js'))

// 创建window的时候才撞见deeplink
function createMainWindow () {
  const mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '../preload.js'),
      webSecurity: false,
      nodeIntegration: true,
    }
  })

  mainWin.loadFile('index.html')
  mainWin.webContents.openDevTools()


  function createSubWindow (filePath) {
    // console.log('webContents', webContents)
    console.log('screen width', screen.getPrimaryDisplay().workAreaSize.width)
    console.log('screen height', screen.getPrimaryDisplay().workAreaSize.height)
    const screens = screen.getAllDisplays();
    console.log('screen.getAllDisplays()', screens)

    const win = new BrowserWindow({
      // parent: mainWin,
      modal: false,
      width: 800,
      height: 500,
      webPreferences: {
        webSecurity: false,
      }
    })
    const fileName = path.join(__dirname, filePath);
    console.log('fileName', fileName)
    win.webContents.loadFile(fileName)
    win.setBounds({ x: 0, y: 0, width: 300, height: 300 })
    // mainWin.webContents.loadURL('file://' + fileName)
    win.webContents.openDevTools()
    win.once('ready-to-show', () => {
      win.show()
    })

    // window.open(path.join(__dirname, filePath))
  }
  
  ipcMain.on('onCreateSubWindow', (event, filePath) => {
    console.log('ipcMain ondragstart', filePath)
    createSubWindow(filePath)
  })

}


app.whenReady().then(()=>{
  createMainWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})
// 处理协议 在本例中，我们选择显示一个错误提示对话框。
app.on('open-url', (event, url) => {
  console.log('on open-url', url)
  dialog.showErrorBox('欢迎回来', `导向自: ${url}`)
})
// Electron 在完成初始化，并准备创建浏览器窗口时，
// 会调用这个方法。
// 部分 API 在 ready 事件触发后才能使用。

console.log('name', app.getName())
