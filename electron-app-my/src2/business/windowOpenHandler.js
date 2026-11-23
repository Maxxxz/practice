// import { session } from 'electron';
const {session} = require('electron')



module.exports.windowOpenHandler = function(mainWindow) {
    
    mainWindow.webContents.session.cookies.set({
        url: 'https://github.com',
        domain: 'github.com',
        name: 'maxicookies',
        // 老pcqq的p_uin不补0, 需要对齐
        value: 'abcd',
    })
    session.fromPartition('cookies:jaye')

    mainWindow.webContents.setWindowOpenHandler(({ url, ...args }) => {
        console.log('in windowOpenHandler url:', url)
        // console.log('args', args)
        // if (url === 'about:blank') {
          return {
            action: 'allow',
            overrideBrowserWindowOptions: {
              frame: true,
              fullscreenable: false,
              backgroundColor: 'black',
              webPreferences: {
                  devTools: true,
                  // session: session.fromPartition('cookies:jaye')
                  partition: 'cookies:maxi',
                  // partition: session.fromPartition('cookies:jaye')
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
      //   window.webContents.session.cookies.set({
      //     url: 'https://github.com',
      //     domain: 'github.com',
      //     name: 'maxicookies',
      //     // 老pcqq的p_uin不补0, 需要对齐
      //     value: '123',
      // })
    })

    // mainWindow.webContents.on('did-create-window', (window, details) => {
    //     console.log('maxilog d-cre-details2', details)
    //     window.webContents.openDevTools()
    // })
}