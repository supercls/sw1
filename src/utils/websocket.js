import store from "@/store/index.js";
import { message } from "ant-design-vue";
let  timeConnect = 0;
export function uavSocket() {
  const wsuri = "ws://localhost:8090/gcc/broadPackageWS";
  const websocket = new WebSocket(wsuri);
  let storeObj = {
    socket1: "",
    socket2: "",
  };
  websocket.onopen = () => {
    console.log("已连接");
  };
  websocket.onmessage = (message) => {
    try {
      let msg = JSON.parse(message.data);
      let data = JSON.parse(msg.data.data);
      if (data.longPackageHead.msg == "1") {
        storeObj.socket1 = data;
      } else if (data.longPackageHead.msg == "2") {
        storeObj.socket2 = data;
      }
      store.dispatch("setRobot", storeObj);
    } catch (e) {}
  };
  websocket.onclose = (e) => {
    reconnect()
    console.log("已关闭");
  };
  websocket.onerror = (e) =>{
    store.dispatch("setRobot", storeObj);
    message.error("websocket连接失败,正在重新连接")
  }
}

// 重连  jiekou有问题，重连后没响应，连接数累加
function reconnect() {
    // lockReconnect加锁
    timeConnect++;
    console.log("第" + timeConnect + "次重连");
    setTimeout(function () {
        uavSocket();
    }, 2000);

}