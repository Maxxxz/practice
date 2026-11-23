
const { app } = require('electron')
const path = require('path')

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