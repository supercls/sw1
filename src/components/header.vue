<template>
  <div class="el_header">
    <span> {{ title }}</span>
    <div>
      <i v-if="minsize" class="iconfont icon-suoxiao" @click="minimize"></i>
      <i class="iconfont icon-guanbi" @click="closeWindow"></i>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
const { remote } = window.require("electron");
export default defineComponent({
  name: "header",
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
    const closeWindow = () => {
      remote.getCurrentWindow().close();
    };

    const minimize = () => {
      remote.getCurrentWindow().minimize()

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
  display: flex;
  justify-content: space-between;
  height: 32px;
  cursor: move;
  line-height: 32px;
  -webkit-app-region: drag;
  align-items: center;
  background: @mainbg;
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
</style>