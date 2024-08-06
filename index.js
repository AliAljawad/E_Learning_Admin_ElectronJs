const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    title: 'Admin App',
    width: 1000,
    height: 600,
  })
  win.webContents.openDevTools();
  win.loadURL('http://localhost:3000')
  const  startUrl = url.format
    ({
        pathname: path.join(__dirname, './app/index.html'),
        protocol: 'file:',
    });
}
app.whenReady().then(createWindow)