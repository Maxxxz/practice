const { app, BrowserWindow, ipcMain, webContents, screen } = require('electron')
const path = require('path')
const fs = require('fs')
const https = require('https')

function registerDeepLink(){
  // 注册 deeplink
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient('maxi-fiddle', process.execPath, [path.resolve(process.argv[1])])
    }
  } else {
    console.log('maxi easy')
    app.setAsDefaultProtocolClient('maxi-fiddle')
  }
}
// 直接注册，有这个app就能通过deeplink打开
registerDeepLink()

// 创建window的时候才撞见deeplink
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
})

ipcMain.on('ondragstart', (event, filePath) => {
  console.log('ipcMain ondragstart', filePath)
  event.sender.startDrag({
    file: path.join(__dirname, filePath),
    icon: iconName
  })
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
  // dialog.showErrorBox('欢迎回来', `导向自: ${url}`)
})
// Electron 在完成初始化，并准备创建浏览器窗口时，
// 会调用这个方法。
// 部分 API 在 ready 事件触发后才能使用。

console.log('name', app.getName())


