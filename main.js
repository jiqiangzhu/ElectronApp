const { app, BrowserWindow, ipcMain } = require('electron');
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
      case "maximize": //当前是最大化，转为normal
        // if (mainWindow.isMaximized()) {
          mainWindow.setContentSize(1024, 680);
          mainWindow.center();
        // }
        break;
      case "minimize": //最小化
        if (mainWindow.isMinimized()) {
          return;
        }
        mainWindow.minimize();
        break;
      case "close": //关闭
        mainWindow.close();
        break;
      case "normal": //当前为默认，转为最大化
        // mainWindow.setContentSize(1024, 680);
        // mainWindow.center();
        if (mainWindow.isMaximized()) {
          return;
        }
        mainWindow.maximize();
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
      default:
        break;
    }

  }
  // win.webContents.send("maximize", "我是主进程已收到消息"); // 响应渲染进程
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
    },
    titleBarStyle: 'customButtonsOnHover',
    frame: false,
    resizable: false
  })

  mainWindow.setMenu(null);
  const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl';
  mainWindow.loadURL(urlLocation);
  mainWindow.webContents.openDevTools();


})
