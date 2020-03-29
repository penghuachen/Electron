let ipcRenderer = require('electron').ipcRenderer;

// 撰寫功能位置
const btn = document.querySelector('Button');

btn.addEventListener('click', () => {
  ipcRenderer.send('close-main-window');
})