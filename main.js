const { app, BrowserWindow, ipcMain, globalShortcut, dialog } = require('electron');
const isDev = require('electron-is-dev')
const path = require('path');
let mainWindow;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

/**
 * 初始化窗口
 */
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 680,
    // transparent: true, //设置透明后窗口最大化会出现问题
    backgroundColor: "#3B3B4D", //设置背景色，在未被完全加载前加载出颜色
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

//  case "fixedOnTop":
//    if (!mainWindow.isAlwaysOnTop()) {
//      mainWindow.setAlwaysOnTop(true);
//    } else {
//      mainWindow.setAlwaysOnTop(false);
//    }



/**
 * 添加 改变窗口透明度 窗口大小 打开文件夹路径等监听
 */
ipcMain.on("changeOpacity", async (event, args) => {
  await mainWindow.setOpacity(args);
})
ipcMain.on("setMax", async (event, args) => {
  await mainWindow.maximize();
})
ipcMain.on("setRestore", async (event, args) => {
  await mainWindow.restore();
})
ipcMain.on("setClose", async (event, args) => {
  await mainWindow.close();
})
ipcMain.on("openFolder", async (event, args) => {
  let fileReturn = await dialog.showOpenDialog({ "title": "Choose Music DirPath", properties: ['openFile', 'openDirectory', 'showHiddenFiles', 'createDirectory ', 'multiSelections'], defaultPath: args })
  if (!fileReturn.canceled) {
    await event.reply('asynchronous-reply', fileReturn)
  }
});




/**
 * 仅在开发环境注册打开控制台的快捷键
 */
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