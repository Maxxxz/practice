const { app, BrowserWindow, ipcMain, webContents, screen, dialog } = require('electron')
const path = require('path')
require('/Users/maxi/Desktop/git/maxi-github/practice/electron-apps/asar/test0.asar')
// const fs = require('fs')
// const https = require('https')

function registerDeepLink(){
  // 注册 deeplink
  if (process.defaultApp) {
    console.log('process.argv', process.argv)
    if (process.argv.length >= 2) {
      console.log('process.argv >=2', path.resolve(process.argv[1]))
      app.setAsDefaultProtocolClient('jayeLink', process.execPath, [path.resolve(process.argv[1])])
    }
    console.log('jaye registerDeepLink')
  } else {
    console.log('jaye easy')
    app.setAsDefaultProtocolClient('jayeLink')
  }

  // mac
  // 处理协议 在本例中，我们选择显示一个错误提示对话框。
  app.on('open-url', (event, url) => {
    console.log('on open-url event', event)
    console.log('on open-url url', url)
    dialog.showErrorBox('欢迎回来1', `导向自: ${url}`)
  })

  // win
  // app.on('second-instance', (event, commandLine, workingDirectory) => {
  //   // 用户正在尝试运行第二个实例，我们需要让焦点指向我们的窗口
  //   if (mainWindow) {
  //     if (mainWindow.isMinimized()) mainWindow.restore()
  //     mainWindow.focus()
  //   }
  //   // 命令行是一个字符串数组，其中最后一个元素是深度链接的URL。
  //   dialog.showErrorBox('Welcome Back', `You arrived from: ${commandLine.pop()}`)
  // })
}
// 直接注册，有这个app就能通过deeplink打开
registerDeepLink()

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

  mainWin.loadFile(path.join(__dirname, 'index.html'),)
  mainWin.webContents.openDevTools()

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

// Electron 在完成初始化，并准备创建浏览器窗口时，
// 会调用这个方法。
// 部分 API 在 ready 事件触发后才能使用。

console.log('name', app.getName())


