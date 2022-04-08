<template>
  <div id="indexlayout">
    <header>
      <span>logo</span>
      <div>
        <i class="iconfont icon-suoxiao" @click="minimize"></i>
        <i class="iconfont icon-guanbi" @click="closeWindow"></i>
      </div>
    </header>
    <div class="menu">
        <ul>
            <li>

            </li>
        </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
const { remote } = window.require("electron");
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "indexLayout",
  setup() {
    const closeWindow = () => {
      remote.getCurrentWindow().close();
    };

    const minimize = () => {
      remote.getCurrentWindow().minimize();
    };
    return {
      closeWindow,
      minimize,
    };
  },
});
</script>
<style lang="less" scoped>
#indexlayout {
  header {
    display: flex;
    justify-content: space-between;
    height: 32px;
    cursor: move;
    line-height: 32px;
    -webkit-app-region: drag;
    align-items: center;
    background: linear-gradient(-86deg, #1F2870, #131832);
    border-bottom: 1px solid #7287fd;
    opacity: 0.9;
    padding: 0 15px;
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