const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev')
let mainWindow;
let mainWindowId;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

ipcMain.on("changeWinSize", (event, args) => { //自定义改变窗口大小
  if (mainWindow) {
    switch (args) {
      case "maximize":
        if (mainWindow.isMaximized()) {
          return;
        }
        mainWindow.maximize();
        break;
      case "minimize":
        if (mainWindow.isMinimized()) {
          return;
        }
        mainWindow.minimize();
        break;
      case "close":
        mainWindow.close();
        break;
      case "normal":
        // console.log("mainWindow.isNormal()---", mainWindow.isNormal());
        // console.log("mainWindow.getSize()---", mainWindow.getSize());
        // if (mainWindow.isNormal()) {
        //   return;
        // }
        mainWindow.setContentSize(1024, 680);
        mainWindow.center();
        break;
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
