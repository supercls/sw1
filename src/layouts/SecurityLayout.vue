<template>
  <router-view />
</template>
<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const electron = window.require("electron");
const { remote } = electron;
const isDevelopment = process.env.NODE_ENV !== "production";
const winURL = isDevelopment ? "http://localhost:8001" : `app://./index.html`;
export default defineComponent({
  setup: () => {
    const store = useStore();

    const Token = computed(() => store.state.Token);
    console.log(global);
    if (!Token.value) {
      console.log(global.windowObj)

      if (global.windowObj == undefined) {
        console.log(6666)
        global.windowObj = {};
      }
      console.log(global.windowObj)
      if ('login' in global.windowObj) {
        console.log(9999)
        global.windowObj['login'].show();
      } else {
        let win = new remote.BrowserWindow({
          width: 400,
          height: 550,
          frame: false,
          webPreferences: {
            nodeIntegration: true,
          },
        });
        global.windowObj.login = win;
        win.loadURL(winURL + "#/login");
        win.on("closed", () => {
          win = null;
        });
      }
      let windowArr = remote.BrowserWindow.getAllWindows();
      console.log(windowArr);
    }
    console.log(Token.value);
    return {
      Token,
    };
  },
});
</script>