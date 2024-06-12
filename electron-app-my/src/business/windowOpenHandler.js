// import { session } from 'electron';
const {session} = require('electron')



module.exports.windowOpenHandler = function(mainWindow) {
    
    mainWindow.webContents.session.cookies.set({
        url: 'https://github.com',
        domain: 'github.com',
        name: 'maxicookies',
        // 老pcqq的p_uin不补0, 需要对齐
        value: 'abc',
    })
    mainWindow.webContents.setWindowOpenHandler(({ url, ...args }) => {
        console.log('in windowOpenHandler url:', url)
        // console.log('args', args)
        // if (url === 'about:blank') {
          return {
            action: 'allow',
            overrideBrowserWindowOptions: {
              frame: false,
              fullscreenable: false,
              backgroundColor: 'black',
              webPreferences: {
                  devTools: true,
                  partition: 'cookies:maxi2',
                // preload: 'my-child-window-preload-script.js'
              }
            }
          }
        // }
        // return { action: 'allow' }
    })

    mainWindow.webContents.on('did-create-window', (window, details) => {
        console.log('maxilog d-cre-details', details)
        window.webContents.openDevTools()
    })

    mainWindow.webContents.on('did-create-window', (window, details) => {
        console.log('maxilog d-cre-details2', details)
        window.webContents.openDevTools()
    })
}