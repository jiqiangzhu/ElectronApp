const { app, BrowserWindow, ipcMain, globalShortcut, dialog } = require('electron');
const isDev = require('electron-is-dev')
const path = require('path');
let mainWindow;
// let mainWindowId;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';


ipcMain.on("changeWinSize", function (event, args) {
  console.log("操作----------", args);
  if (mainWindow) {
    switch (args) {
      case "minimize": //最小化
        if (mainWindow.isMinimized()) {
          return;
        }
        mainWindow.minimize();
        break;
      case "close":
        mainWindow.close();
        break;
      case "max":
        mainWindow.maximize();
        break;
      case "restore":
        mainWindow.setContentSize(1024, 680);
        mainWindow.center();
        break;
      case "fixedOnTop":
        if (!mainWindow.isAlwaysOnTop()) {
          mainWindow.setAlwaysOnTop(true);
        } else {
          mainWindow.setAlwaysOnTop(false);
        }
        break;
      default:
        break;
    }

  }
});

ipcMain.on("openFolder", async (event, args) => {
  let fileReturn = await dialog.showOpenDialog({ "title": "Choose Music DirPath", properties: ['openFile', 'openDirectory', 'showHiddenFiles', 'createDirectory ', 'multiSelections'], defaultPath: args })
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
    resizable: true,
    icon: path.join(__dirname, '/public/logo48.ico'),
    title: "Cool Music"
  })
  mainWindow.setMenu(null);
  const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl';
  mainWindow.loadURL(urlLocation);
  mainWindow.setMaximizable(true);

})

if (isDev) {
  app.whenReady().then(() => {
    const ret = globalShortcut.register('Alt+F12', () => {
      mainWindow.webContents.openDevTools();
    })

    if (!ret) {
      console.log('registration failed')
    }

    console.log("Alt + F12打开控制台快捷键注册成功了吗", globalShortcut.isRegistered('Alt+F12'))
  })
}