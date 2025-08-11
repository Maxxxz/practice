const { app, BrowserWindow } = require('electron')
const path = require('path')

export const createPersonWindow = () => {
  // 创建浏览窗口
  const mainWindow = new BrowserWindow({
    width: 700,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'person-js.js')
    }
  })

  // 加载 index.html
  mainWindow.loadFile('person.html')

  // 打开开发工具
  mainWindow.webContents.openDevTools();


  // 在此示例中，将仅创建具有 `about:blank` url 的窗口。
  // 其他 url 将被阻止。
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url === 'about:blank') {
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          frame: false,
          fullscreenable: false,
          backgroundColor: 'black',
          webPreferences: {
            preload: 'my-child-window-preload-script.js'
          }
        }
      }
    }
    return { action: 'deny' }
  })

}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    createPersonWindow()
  
    app.on('activate', () => {
      // 在 macOS 系统内, 如果没有已开启的应用窗口
      // 点击托盘图标时通常会重新创建一个新窗口
      if (BrowserWindow.getAllWindows().length === 0) createPersonWindow()
    })
  })
  
  // 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
  // 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
  // 直到用户使用 Cmd + Q 明确退出
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
  
  // 在当前文件中你可以引入所有的主进程代码
  // 也可以拆分成几个文件，然后用 require 导入。
