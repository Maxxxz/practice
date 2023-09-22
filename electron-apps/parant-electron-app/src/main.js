const { app, BrowserWindow, ipcMain, webContents, screen } = require('electron')
const path = require('path')
const fs = require('fs')
const https = require('https')
const childProcess = require("child_process")
// 开发环境
// const { createChildWindow } = require('/maxi.asar/main.js') 
// 打包之后 需要手动拷贝下链接去实现
// const { createChildWindow } = require('../../../../maxi.asar/main.js')

// 创建window的时候才撞见deeplink
function createMainWindow () {
  const mainWin = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: './weishi.png',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
      nodeIntegration: true,
    }
  })

  mainWin.loadFile('index.html')
  mainWin.webContents.openDevTools()
}

function createSubWindow (filePath) {
  console.log('screen width', screen.getPrimaryDisplay().workAreaSize.width)
  console.log('screen height', screen.getPrimaryDisplay().workAreaSize.height)
  const screens = screen.getAllDisplays();
  console.log('screen.getAllDisplays()', screens)

  const win = new BrowserWindow({
    // parent: mainWin,
    modal: false,
    width: 800,
    height: 500,
    icon: './weishi.png',
    webPreferences: {
      webSecurity: false,
    }
  })
  const fileName = path.join(__dirname, filePath);
  console.log('fileName', fileName)
  win.webContents.loadFile(fileName)
  win.setBounds({ x: 0, y: 0, width: 600, height: 600 })
  win.webContents.openDevTools()
  win.once('ready-to-show', () => {
    win.show()
  })
}

ipcMain.on('onCreateSubWindow', (event, filePath) => {
  console.log('ipcMain onCreateSubWindow', filePath)
  createSubWindow(filePath)
})

ipcMain.on('onCreateAsarWindow', (event) => {
  console.log('ipcMain onCreateAsarWindow 2')
  // createChildWindow()
  // childProcess.execSync("electron -v", {}, (...args)=>{
  //   console.log('-v', ...args)
  // })
  // console.log('maxi 1')
  // childProcess.exec("electron /Users/maxi/Desktop/git/maxi-github/practice/electron-apps/parant-electron-app/src/maxi-auto-init.asar/main.js", {stdio: [0, 1, 2]}, (...args)=>{
  //   console.log('electron main', ...args)
  // });
  // childProcess.fork(path.join(__dirname, './test.js'))

  // const electronSrc = path.join('/Users/maxi/Desktop/git/maxi-github/practice/electron-apps/parant-electron-app/node_modules/.bin/electron')
  // childProcess.fork('electronSrc', ['/Users/maxi/Desktop/git/maxi-github/practice/electron-apps/parant-electron-app/src/maxi-auto-init.asar/main.js','--max-old-space-size=8096'], {execPath: '/Users/maxi/Desktop/git/maxi-github/practice/electron-apps/parant-electron-app/node_modules/'}, (error, stdout, stderr) => {
  //   if (error) {
  //     throw error;
  //   }
  //   console.log('maxi stdout', stdout);
  // }); 

  // childProcess.execSync("electron ./maxi.asar/main.js", {stdio: [0, 1, 2]});

   const cWin = childProcess.spawn('/Users/maxi/Desktop/git/maxi-github/practice/electron-apps/parant-electron-app/node_modules/.bin/electron', ['/Users/maxi/Desktop/git/maxi-github/practice/electron-apps/parant-electron-app/src/maxi-auto-init.asar/main.js'], {
      // detached: true,
      shell: true,
      cwd: '/Users/maxi/Desktop/git/maxi-github/practice/electron-apps/parant-electron-app/node_modules/.bin/electron'
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
  // dialog.showErrorBox('欢迎回来', `导向自: ${url}`)
})
// Electron 在完成初始化，并准备创建浏览器窗口时，
// 会调用这个方法。
// 部分 API 在 ready 事件触发后才能使用。
console.log('name', app.getName())


