
// preload.js
const path = require('path');

// 所有的 Node.js API接口 都可以在 preload 进程中被调用.
// 它拥有与Chrome扩展一样的沙盒。
// window.addEventListener('DOMContentLoaded', () => {
//     console.log('DOMContentLoaded 1')
//     const replaceText = (selector, text) => {
//       const element = document.getElementById(selector)
//       if (element) element.innerText = text
//     }
  
//     // for (const dependency of ['chrome', 'node', 'electron']) {
//     //   replaceText(`${dependency}-version`, process.versions[dependency])
//     // }
//     document.querySelector('#hello').addEventListener('click', function(){
//       console.log('click 2');
//       // window.open('https://github.com', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')
//       createPersonWindow();
//     })
//   })

//   function createPersonWindow(){
//     console.log('webContents', webContents);
//     console.log('Electron', window.Electron);
//     let subWind = new BroswerWindow({
//       parent: top,
//       with: 500,
//       height: 400
//     })
//     subWind.loadFile('src/pages/person.html')

//     child.once('ready-to-show', () => {
//       child.show()
//     })
//   }

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  startDrag: (fileName) => {
    console.log('electron exposeInMainWorld startDrag', fileName)
    ipcRenderer.send('ondragstart', fileName)
    // 发送给主进程
  },
  createWin: (fileName) => {
    console.log('electron exposeInMainWorld createWin', fileName)
    ipcRenderer.send('onCreateSubWindow', fileName)
    // 发送给主进程
    // window.open('file://Users/maxi/Desktop/git/maxi-github/practice/my-electron-app/pages/person.html')
  },
})