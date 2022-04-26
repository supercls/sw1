<template>
  <div class="el_header">
    <div class="header">
      <img src="../assets/images/logo.png" alt="" />
      <div>
        <i class="iconfont icon-suoxiao" @click="minimize"></i>
        <i class="iconfont icon-guanbi" @click="closeWindow"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
const { remote,ipcRenderer } = window.require("electron");
export default defineComponent({
  name: "Homeheader",
  props: {
    title: {
      type: String,
      default: "标题",
    },
    minsize: {
      type: Boolean,
      default: false,
    },
  },
  setup: () => {
    const minimize = () => {
      remote.getCurrentWindow().minimize();
    };
    const closeWindow = () => {
      ipcRenderer.send('close')
    };
    return {
      closeWindow,
      minimize
    };
  },
});
</script>
<style lang="less" scoped>
.el_header {
  .header {
    display: flex;
    justify-content: space-between;
    height: 38px;
    cursor: move;
    line-height: 38px;
    -webkit-app-region: drag;
    align-items: center;
    background: linear-gradient(-86deg, #1F2870, #131832);
    border-bottom: 1px solid #2d345d;
    opacity: 0.9;
    padding: 0 15px;
    img {
      width: 98px;
      margin-left: 10px;
    }
    .icon-suoxiao {
      margin-right: 20px;
    }
    span {
      color: #91a9ff;
      font-size: @font16;
    }
    i {
      font-size: @font16;
      -webkit-app-region: no-drag;
      cursor: pointer;
      color: #cccccd;
    }
  }
}
</style>