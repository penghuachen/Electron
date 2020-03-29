# 初探 Electron

![](https://i.imgur.com/IQJIArb.png)

如果你有能力寫網站，就寫得出桌面應用程式。 Electron 是個用 JavaScript、HTML 及 CSS 等網頁技術開發原生應用程式的框架。

![](https://i.imgur.com/1a6Hgwx.png)


此外，**Electron 並不是綁定在圖形使用者介面(GUI)的 JavaScript 函式庫。Electron 使用網頁作為他的 GUI**，可以視為被 JavaScript 控制的一個精簡版的Chromium 瀏覽器。

## 開發環境設定

在建立第一個 Electron 應用程式之前，需要一些環境的前置設定。

1. 安裝 [Node.js](https://nodejs.org/en/)

    並且透過以下指令確認當前 Node.js 版本、 npm 版本。

    在 macOS、window、Linux 皆可使用。

```bash=
# 這個指令應該會印出 Node.js 版本
node -v

# 這個指令應該會印出 npm 版本
npm -v
```

2. 選一套編輯器

Electron 官方推薦使用 Atom 或者 visual studio code。

## 建立第一個 APP 應用程式

### 建立一個資料夾

建立一個資料夾且基本要求需要有以下檔案:

```bash=
your-app/
├── package.json
├── main.js
└── index.html
```

其中 `package.json` 可以透過以下指令初始化:

```bash=
npm init -y
```

而 `package.json` 中的設定如下:

```json=
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js", 
  "scripts": {
    "start": "electron ."
  }
}
```

需要注意的是如果沒有 `main` 的話，可以自行填入。

否則 Electron 則會尋找並執行 `index.js` 的檔案。

### 安裝 Electron

```bash=
npm install --save-dev electron
```

### 引入 Electron

同於 Node.js ，遵從 CommonJS 的規則，可以透過 `require` 引入模組:

```javascript=
const electron = require('electron')
```

### 建立應用程式

```javascript=
// 官方範例
// main.js
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// 有些 API 只能在這個事件發生後才能用。
app.whenReady().then(createWindow)

// Quit when all windows are closed.
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

// In this file you can include the rest of your app's specific main process
// code. 
// 你也可以將它們放在別的檔案裡，再由這裡 require 進來。
```

## 本次使用到的語法與詞彙學習

### 總覽
- 語法
  1. `app`
  2. `BrowserWindow`
  3. `BrowserWindow.webPreferences`
  4. `win.loadFile`
  5. `webContents`
  6. `whenReady`
  7. `process.platform`
  8. `app.quit`

- 詞彙
  1. 主處理序

#### app

用來**控制應用程式事件生命週期**，該物件提供許多方法達成控制應用程式事件的需求。

處理序：主處理序

透過以下寫法執行:

```javascript=
const { app } = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})

```


#### app.whenReady

當 Electron 被初始化時，用來判斷是否已經完整初始化，如果是則 Promise 會 reslove，否則則 reject。

#### app.quit

當最後一個視窗已經關閉的時候終止程式

```javascript=
const { app } = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

相關事件的資訊可於 [app 物件](https://www.electronjs.org/docs/api/app#app) 查詢。

#### BrowserWindow

**建立及控制瀏覽器視窗，可以設定該視窗的樣式、大小或其他狀態等。**

處理序：主處理序

```javascript=
const { 
  app, 
  BrowserWindow 
} = require('electron');

function createWindow () {
  const params = {
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  };
  let win = new BrowserWindow(params);
}
```

#### BrowserWindow.webPreferences

可用來設定網頁的功能。

#### win.loadFile

載入 HTML，使用該語法會回傳一個 Promise，並且在網頁成功載入時 resolve ，若失敗則為 reject。

```bash=
win.loadFile(filePath[, options])
```

#### webContents

**渲染及控制網頁，是 `BrowserWindwo` 的特性，**

處理序：主處理序

一個簡單的例子: 設定開啟開發者工具:

```javascript=
const { 
  app, 
  BrowserWindow 
} = require('electron');

function createWindow () {
  const params = {
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  };

  let win = new BrowserWindow(params);

  win.loadFile('main.html');

  win.webContents.openDevTools({
    mode: 'detach'; // 開啟一個獨立視窗的開發者工具
  });
}
```

#### process.platform

是 Node.js 的指令，用來取得其運行時的系統平台，包含如下：

- `aix`
- `darwin` (MacOS)
- `freebsd`
- `linux`
- `openbsd`
- `sunos`
- `win32`

```javascript=
console.log(`此平台是 ${process.platform}`);
```

#### 主處理序

1. 主處理序通常命名為 `main.js`，是每個 Electron 應用程式的入口點。
2. 控制應用程式由開啟到關閉的整個生命週期。 
3. 通常也會用它來管理功能表、功能表列、Dock、Tray 等原生元素。 
4. 主處理序也負責建立應用程式中的每個畫面轉譯處理序
5. 每個應用程式的主處理序檔是 `package.json` 的 `main` 值指定。
6. 這個處理序在 Chromium 中叫做「瀏覽器處理序」。Electron 改叫主處理序是為了避免與畫面轉譯處理序搞混。

## Electron 應用程式架構

Electron 建立兩種程序:

1. main process 主處理序
2. renderer process 畫面轉譯處理序

原因在於 Electron 採用 Chromium 的多程序架構，**透過 main process 建立應用程式，然後透過 renderer process 繪製網頁。**

如果要讓 **網頁對 GUI 進行操作，則需要讓其對應的 renderer process 和 main process 溝通，請求進行相關的 GUI 操作。**

### IPC(Inter-Process Communication)跨處理序通訊機制

Electron 使用 IPC 在主處理序及畫面轉譯處理序間傳送序列化的 JSON 訊息。

簡單說就是 **處理 main process 與 renderer process 之間的通訊**

透過以下語法進行通訊:
1. ipcMain
2. ipcRenderer 

通訊概念如下:

![](https://i.imgur.com/YMxkkdu.png)

#### 實務作法

範例程式碼: 透過按鈕關閉應用程式。

```javascript=
// main.js
const { 
  app, 
  BrowserWindow,
  ipcMain 
} = require('electron');

// other code...

ipcMain.on('close-main-window', () => {
  app.quit();
})
```

```javascript=
// renderer.js
let ipcRenderer = require('electron').ipcRenderer;

const btn = document.querySelector('Button');

btn.addEventListener('click', () => {
  // channel name: close-main-widow
  ipcRenderer.send('close-main-window');
})
```

## 參考來源

- [寫你第一個 Electron 應用程式
](https://www.electronjs.org/docs/tutorial/first-app)
- [API 文件](https://www.electronjs.org/docs/api)
- [app 物件](https://www.electronjs.org/docs/api/app#app)
- [BrowserWindow](https://www.electronjs.org/docs/api/browser-window)
- [win.loadFile()](https://www.electronjs.org/docs/api/browser-window#winloadfilefilepath-options)
- [Electron 詞彙總表](https://www.electronjs.org/docs/glossary#main-process)
- [Electron 應用程式架構](https://www.electronjs.org/docs/tutorial/application-architecture#electron-%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F%E6%9E%B6%E6%A7%8B)
- [ipcMain.on()](https://www.electronjs.org/docs/api/ipc-main?)
- [ipcRenderer.send()](https://www.electronjs.org/docs/api/ipc-renderer)
- [IPC 機制](https://medium.com/@terracotta_ko/electron-ipc-%E6%A9%9F%E5%88%B6-2a1b087c9ae5)
- [process.platform](http://nodejs.cn/api/process.html#process_process_platform)
