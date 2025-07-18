const { app, BrowserWindow, WebContentsView } = require('electron')
const path = require('node:path')
const fs = require('fs').promises;

let startTime;

async function createWindow () {
  startTime = Date.now();
  
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      partition: 'persist:maxi'
    }
  })

  // Register custom protocol 'app' in session-created callback
  // Create first webContentsView for tabs
  const tabView = new WebContentsView({
    webPreferences: {
      nodeIntegration: true,
      partition: 'persist:maxi',
      devtools: true
    }
  });
  tabView.webContents.loadURL('app://./tabs.html');
  tabView.webContents.openDevTools({ mode: 'detach' });
  mainWindow.contentView.addChildView(tabView);
  tabView.setBounds({ x: 0, y: 0, width: 1200, height: 40 })
  tabView.on('did-finish-load', () => {
    console.log('Tabs loaded in', (Date.now() - startTime) / 1000, 'seconds');
  });


  // Create second webContentsView for online content
  const bodyView = new WebContentsView({
    webPreferences: {
      nodeIntegration: true,
      partition: 'persist:maxi'
    }
  });
  bodyView.webContents.loadURL('https://www.qq.com');
  mainWindow.contentView.addChildView(bodyView);
  bodyView.setBounds({ x: 0, y: 40, width: 1200, height: 760 });
  // Log lifecycle events
  bodyView.on('did-finish-load', () => {
    console.log('Content loaded in', (Date.now() - startTime) / 1000, 'seconds');
  });
}

console.log('maxilog 000')

app.whenReady().then(async () => {
  console.log('maxilog 111')

  // Register custom protocol 'app' in session-created callback
  app.on('session-created', (session) => {
    session.protocol.handle('app', async (request) => {
      const url = request.url.slice(6); // Remove 'app://'
      const filePath = path.normalize(`${__dirname}/${url}`);
      console.log('maxilog url filePath', url, filePath)
      try {
        const res1 = await fs.access(filePath);
        console.log('maxilog res1',res1)
        const fileContent = await fs.readFile(filePath);
          console.log('maxilog res1',res1)
        // Determine Content-Type based on file extension
        const ext = path.extname(filePath).toLowerCase();
        let contentType = 'text/html';
        if (ext === '.js') contentType = 'application/javascript';
        else if (ext === '.css') contentType = 'text/css';
        else if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') contentType = `image/${ext.slice(1)}`;
        
        return new Response(fileContent, {
          status: 200,
          headers: { 'Content-Type': contentType }
        });
      } catch (error) {
        console.log('maxilog app handle error', error)
        return new Response(null, {
          status: 404,
          headers: { 'Content-Type': 'text/html' }
        });
      }
    });
  });
  console.log('maxilog 222')
  await createWindow();
  console.log('maxilog 333')
    // Register custom protocol 'app' in session-created callback
 
});