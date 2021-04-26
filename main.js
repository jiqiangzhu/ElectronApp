const { app, BrowserWindow, ipcMain, globalShortcut, dialog } = require('electron');
const isDev = require('electron-is-dev')
let mainWindow;
let mainWindowId;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

/**
 * 主进程 渲染进程之间通信 
 * 主进程添加监听
 * 最大化 最小化 关闭主窗口
 */
ipcMain.on("changeWinSize", (event, args) => { //自定义改变窗口大小
  if (mainWindow) {
    switch (args) {
      case "minimize": //最小化
        if (mainWindow.isMinimized()) {
          return;
        }
        mainWindow.minimize();
        break;
      case "close": //关闭
        mainWindow.close();
        break;
      case "maxornormal": //全屏 非全屏切换
        // if (mainWindow.fullScreen) {
        //   mainWindow.setFullScreen();
        // } else {
        //   mainWindow.restore();
        // }
        break;
      case "fixedOnTop":
        if (!mainWindow.isAlwaysOnTop()) {
          mainWindow.setAlwaysOnTop(true);
        }
        break;
      case "cancelOnTop":
        if (mainWindow.isAlwaysOnTop()) {
          mainWindow.setAlwaysOnTop(false);
        }
        break;
      default:
        break;
    }

  }
  // win.webContents.send("maximize", "我是主进程已收到消息"); // 响应渲染进程
});

ipcMain.on("openFolder", async (event, args) => { // 打开本地文件夹
  let fileReturn = await dialog.showOpenDialog({ "title": "选择音乐文件夹路径", properties: ['openFile', 'openDirectory', 'showHiddenFiles', 'createDirectory ', 'multiSelections'], defaultPath: args })
  console.log("fileReturn-----------------------", fileReturn)
  if (!fileReturn.canceled) {
    event.reply('asynchronous-reply', fileReturn)
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 680,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      webSecurity: false,
    },
    titleBarStyle: 'customButtonsOnHover',
    frame: false,
    resizable: false,
  })

  mainWindow.setMenu(null);
  const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl';
  mainWindow.loadURL(urlLocation);
})

if (isDev) { // 开发者工具
  app.whenReady().then(() => {
    const ret = globalShortcut.register('Alt+F12', () => {
      mainWindow.webContents.openDevTools();
    })

    if (!ret) {
      console.log('registration failed')
    }

    console.log(globalShortcut.isRegistered('Alt+F12'))
  })
}