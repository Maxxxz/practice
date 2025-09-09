const { app, BrowserWindow, ipcMain  } = require('electron')
const path = require('path')
const fs = require('fs')
const https = require('https')
const childProcess = require("child_process")
const { setView1, setView2 } = require('./broswer-views/view1.js')
// 开发环境
// const { createChildWindow } = require('/maxi.asar/main.js') 
// 打包之后 需要手动拷贝下链接去实现
// const { createChildWindow } = require('../../../../maxi.asar/main.js')
// 创建window的时候才撞见deeplink
let mainWin = null;

ipcMain.on('onCreateSubWindow', (event, filePath) => {
  console.log('ipcMain onCreateSubWindow', filePath)
  // createSubWindow(filePath)
})

ipcMain.on('onCreateAsarWindow', (event) => {
  console.log('ipcMain onCreateAsarWindow 2')

   const cWin = childProcess.spawn('electron.cmd', ['/Users/maxi/Desktop/git/maxi-github/practice/electron-apps/parant-electron-app/src/maxi-auto-init.asar/main.js'], {
      // detached: true,
      shell: true,
    }, (error, stdout, stderr)=>{
      if (error) {
        throw error;
      }
      console.log('maxi stdout', stdout);
    });


    cWin.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    cWin.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      throw data;
    });

    cWin.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    }); 
})


ipcMain.on('openBV1', (event) => {
  console.log('ipcMain openBV1')
  setView1(mainWin)
})

ipcMain.on('openBV2', (event) => {
  console.log('ipcMain openBV2')
  setView2(mainWin)
})

app.whenReady().then(()=>{
  // createMainWindow()
  app.name = 'name2'
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    // createMainWindow()

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


// app.setAboutPanelOptions({
//   applicationName: 'my app',
//   iconPath: path.join(__dirname, 'aaa.png')
// })

// 设置底部的快捷菜单
app.dock?.setIcon(path.join(__dirname, 'static/icon.png'))

app.name = 'name1'
// app.setName('setNameAA1')