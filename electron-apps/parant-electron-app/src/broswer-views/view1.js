// In the main process.
const { BrowserView, ipcMain, app } = require('electron')
const path = require('path')

let view1
app.whenReady().then(()=>{
    view1 = new BrowserView({
        // offscreen: true,
        // transparent: false
    });
    view1.webContents.loadURL('http://192.168.255.10:3000')
})


function setView1(mainWin){
    
    mainWin.setBrowserView(view1)
    
    view1.setBounds({ x: 400, y: 0, width: 800, height: 500 })
    view1.setBackgroundColor('#000')
    console.log('show 0')
    // mainWin.show()
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