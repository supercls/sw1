<template>
  <div class="main">
    我是登录窗口
    <button @click="minimize">缩小</button>
    <button @click="login">登录</button>
  </div>
</template>
<script>
const { ipcRenderer } = window.require("electron");
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "login",
  setup() {
    const store = useStore();

    const router = useRouter();
    const minimize = () => {
      ipcRenderer.send("minimize");
    };
    const login = async () => {
      let res = true;
      if (res === true) {
        store.dispatch("setToken", "6666");
        setTimeout(() => {
          ipcRenderer.send("changWindowSize");
          router.replace({
            path: "/",
          });
        }, 1000);
      }
    };
    return {
      minimize,
      login,
    };
  },
};
</script>