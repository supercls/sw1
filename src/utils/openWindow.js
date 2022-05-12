const electron = window.require("electron");
const { remote } = electron;
const isDevelopment = process.env.NODE_ENV !== "production";
const winURL = isDevelopment ? "http://localhost:8000" : `app://./index.html`;
export function Electronwindow(dom, width, height, url) {
  if (global.windowObj == undefined) {
    global.windowObj = {};
  }
  try {
    global.windowObj[dom].show();
  } catch (e) {
    let win = new remote.BrowserWindow({
      width: width,
      height: height,
      transparent: true, //窗口透明，有bug
      resizable: true, //设置窗口可拉伸
      movable: true, //设置窗口可拖动
      skipTaskbar: false,
      frame: false, //无边框
      minWidth: width,
      minHeight: height,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    win.loadURL(winURL + url);
    win.on("closed", () => {
      //dom = null;
    });
    global.windowObj[dom] = win;
  }
}
