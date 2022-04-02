<template>
  <div class="indexlayout-main-conent">
    <flymock></flymock>
    {{Token}}
    <a-button type="primary" @click="openDialog(1, 'a')">
      打开新窗口1
    </a-button>
    <a-button type="primary" @click="openDialog(2, 'b')"> 打开新窗口2</a-button>
  </div>
</template>

<script>
import flymock from "../component/flymock/index.vue";
import {useStore} from 'vuex'
const electron = window.require("electron");
const { ipcRenderer } = electron;
const { remote } = electron;
const isDevelopment = process.env.NODE_ENV !== "production";
const winURL = isDevelopment ? "http://localhost:8000" : `app://./index.html`;
import { defineComponent ,computed} from "vue";
export default defineComponent({
  name: "home",
  components: {
    flymock,
  },
  setup: () => {
    const store = useStore()
     console.log(store.createPersistedState)
    const Token = computed(() =>store.state.Token)
    console.log(store.state)
    const openDialog = (index, dom) => {
      console.log(global.windowObj);
      console.log(remote.BrowserWindow.getAllWindows());
      if (global.windowObj == undefined) {
        global.windowObj = {};
      }

      if (dom in global.windowObj) {
        global.windowObj[dom].show();
      } else {
        let win = new remote.BrowserWindow({
          id: index,
          width: 400,
          height: 550,
          frame: false,
          webPreferences: {
            nodeIntegration: true,
          },
        });
        win.loadURL(winURL + "#/setting");
        win.on("closed", () => {
          dom = null;
        });
        global.windowObj[dom] = win;
      }
    };
    return {
      openDialog,
      Token
    };
  },
});
</script>
