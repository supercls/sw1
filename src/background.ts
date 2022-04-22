'use strict'

import { app, protocol, BrowserWindow, Menu, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import log from 'electron-log';
import './store/index'

const nodecmd = require('node-cmd');
// 主进程日志文件位置：C:\Users\%USERPROFILE%\AppData\Roaming\{应用名称}\logs
const isDevelopment = process.env.NODE_ENV !== 'production'



//后台服务
// 当前的可执行文件所在目录
let appPath = app.getPath('exe')
// 获取上一层的目录 app 是当前目录名称 需要给去掉
let path = isDevelopment ? appPath.replace(/electron.exe/, 'gcc') : appPath.replace(/gcc.exe/, 'gcc')

log.info(path)
const exec = require('child_process').exec
// 本地须要启动的后台服务名称
let cmdStr = 'gccservice'
let cmdPath = path
let workerProcess



//后台服务

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const winURL = isDevelopment ? 'http://localhost:8000'
  : `app://./index.html`
let win

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 400,
    frame: true,
    backgroundColor: '#252C49',
    transparent: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info.
      nodeIntegration: true,
      webSecurity: false
    }
  })
  //===========自定义file:///协议的解析=======================
  protocol.interceptFileProtocol('file', (req, callback) => {
    const url = req.url.substr(8);
    callback(decodeURI(url));
  }, (error) => {
    if (error) {
      console.error('Failed to register protocol');
    }
  });
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {

    // The production environment hides menus
    Menu.setApplicationMenu(null);

    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL(winURL)
  }

  ipcMain.on('close', e => {

    win.close()
    log.error(`close:${e}`);
  })
  ipcMain.on('minimize', e =>
    win.minimize()
  )

  ipcMain.on('changWindowSize', e =>
    win.maximize()
  )

}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    nodecmd.run('taskkill -f -t -im gccservice.exe')
    exec('taskkill -f -t -im gccservice.exe')
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {

  runExec()
  createWindow()
})

process.on('uncaughtException', function (error) {  //全局异常捕获
  log.error(error)
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// 定义calendar窗体
let calendarWin
// 创建calendar窗口方法
function openCalendarWindow() {
  calendarWin = new BrowserWindow({
    width: 400,
    height: 550,
    frame: false,
    parent: win, // win是主窗口
    webPreferences: {
      nodeIntegration: true
    }
  })
  calendarWin.loadURL(winURL + '#/setting')
  calendarWin.on('closed', () => { calendarWin = null })
}
ipcMain.on('openSettingWindow', e =>
  openCalendarWindow()
)

function runExec() {
  // 执行命令行，若是命令不须要路径，或就是项目根目录，则不须要cwd参数：
  workerProcess = exec(cmdStr, { cwd: cmdPath })
  // 不受child_process默认的缓冲区大小的使用方法，没参数也要写上{}：workerProcess = exec(cmdStr, {})

  // 打印正常的后台可执行程序输出
  workerProcess.stdout.on('data', function (data) {
    console.log('stdout: ' + data)

    log.error(`stdout:${data}`);
  })

  // 打印错误的后台可执行程序输出
  workerProcess.stderr.on('data', function (data) {
    console.log('stderr: ' + data)
    log.error(`stderr:${data}`);
  })

  // 退出以后的输出
  workerProcess.on('close', function (code) {
    console.log('out code：' + code)
    log.error(`out code:${code}`);
  })
}