// In the main process.
const { BrowserView, ipcMain, app } = require('electron')
const path = require('path')

let view1
app.whenReady().then(()=>{
    view1 = new BrowserView({
        // offscreen: true,
        // transparent: false
    });
})


function setView1(mainWin){
    // koa的server
    view1.webContents.loadURL('http://127.0.0.1:3000')
    view1.setBackgroundColor('#fff')
    view1.setBounds({ x: 400, y: 0,width: 800, height: 500 })
    setTimeout(()=>{
        mainWin.setBrowserView(view1)
        view1.setBounds({ x: 400, y: 0, width: 800, height: 500 })
    }, 0)
    
    
    console.log('show 0')
    // mainWin.show()
    console.log('show 1')
    // view1.webContents.
}


let view2
app.whenReady().then(()=>{
    view2 = new BrowserView()
})


function setView2(mainWin){
    mainWin.setBrowserView(view2)
    view2.setBounds({ x: 400, y: 0, width: 300, height: 300 });
    const currentPath = path.join(__dirname, '../pages/person.html');
    view2.webContents.loadFile(currentPath);
    view2.setBackgroundColor('#E2E2E2');
}
 

module.exports.setView1 = setView1

module.exports.setView2 = setView2

// D:\git\myself\practice\electron-apps\parant-electron-app\src\pages\person.html