const { app, BrowserWindow, ipcMain, webContents } = require('electron')
const path = require('path')
const fs = require('fs')
const https = require('https')

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

  mainWin.loadFile('index.html')
  mainWin.webContents.openDevTools()


  function createSubWindow (filePath) {
    console.log('webContents', webContents)
    const win = new BrowserWindow({
      parent: mainWin,
      modal: true,
      width: 800,
      height: 500,
      webPreferences: {
        webSecurity: false,
      }
    })
    const fileName = path.join(__dirname, filePath);
    console.log('fileNa1me', fileName)
    win.webContents.loadFile(fileName)
    win.webContents.openDevTools()
    win.once('ready-to-show', () => {
      win.show()
    })

    // window.open(path.join(__dirname, filePath))
  }
  
  ipcMain.on('onCreateSubWindow', (event, filePath) => {
    console.log('ipcMain ondragstart', filePath)
    createSubWindow(filePath)
  })

}

const iconName = path.join(__dirname, 'iconForDragAndDrop.png')
const icon = fs.createWriteStream(iconName)

// Create a new file to copy - you can also copy existing files.
fs.writeFileSync(path.join(__dirname, 'drag-and-drop-1.md'), '# First file to test drag and drop')
fs.writeFileSync(path.join(__dirname, 'drag-and-drop-2.md'), '# Second file to test drag and drop')

https.get('https://img.icons8.com/ios/452/drag-and-drop.png', (response) => {
  response.pipe(icon)
})

app.whenReady().then(createMainWindow)

ipcMain.on('ondragstart', (event, filePath) => {
  console.log('ipcMain ondragstart', filePath)
  event.sender.startDrag({
    file: path.join(__dirname, filePath),
    icon: iconName
  })
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


