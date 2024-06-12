const fs = require('fs')
const path = require('path')
const https = require('https')
const { ipcMain } = require('electron')

// Create a new file to copy - you can also copy existing files.
fs.writeFileSync(path.join(__dirname, '../drag-and-drop-1.md'), '# First file to test drag and drop')
fs.writeFileSync(path.join(__dirname, '../drag-and-drop-2.md'), '# Second file to test drag and drop')

const iconName = path.join(__dirname, 'iconForDragAndDrop.png')
const icon = fs.createWriteStream(iconName)


https.get('https://img.icons8.com/ios/452/drag-and-drop.png', (response) => {
  response.pipe(icon)
})


ipcMain.on('ondragstart', (event, filePath) => {
    console.log('ipcMain ondragstart', filePath)
    event.sender.startDrag({
      file: path.join(__dirname, filePath),
      icon: iconName
    })
  })