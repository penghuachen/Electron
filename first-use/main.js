// 建立一個 Electron APP

// Use feature which electron expose in namespace.
const { 
  app, 
  BrowserWindow,
  ipcMain 
} = require('electron');

function createWindow () {
  // Set the parameters for your window.
  const params = {
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  };

  // Create the broser window.
  let win = new BrowserWindow(params);

  // Load the main.html file of the app.
  win.loadFile('../app/renderer.html');

  // Show chrome devtools when the app is opened.
  win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization an is ready to create browser windows.
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // 在 macOS 中，一般會讓應用程式及選單列繼續留著，
  // 除非使用者按了 Cmd + Q 確定終止它們
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在 macOS 中，一般會在使用者按了 Dock 圖示
  // 且沒有其他視窗開啟的情況下，
  // 重新在應用程式裡建立視窗。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on('close-main-window', () => {
  app.quit();
})

