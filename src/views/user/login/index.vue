<template>
  <div class="main loginT">
    <el-header title="启动与连接"></el-header>
    <div class="content">
      <p class="title">赛为地面站1.0</p>
      <a-form
        :model="formState"
        name="basic"
        layout="inline"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="通讯方式"
          :colon="false"
          class="elItem"
          name="a"
          :rules="[{ required: true, message: '请选择通讯方式' }]"
        >
          <a-select

            v-model:value="formState.a"
            placeholder="请选择通讯方式"
          >
            <a-select-option value="1">串口通信</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="串口号"
          class="elItem"
          :colon="false"
          name="b"
          :rules="[{ required: true, message: '请选择串口号' }]"
        >
          <a-select
            v-model:value="formState.b"
            placeholder="请选择串口号"
          >
            <a-select-option value="1">COM1</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="波特率"
          class="elItem"
          :colon="false"
          name="c"
          :rules="[{ required: true, message: '请选择波特率' }]"
        >
          <a-select
            v-model:value="formState.c"
            placeholder="请选择波特率"

          >
            <a-select-option value="1">COM1</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>

    </div>
    <button @click="minimize">缩小</button>
    <button @click="login">登录</button>
  </div>
</template>
<script>
const { ipcRenderer } = window.require("electron");
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import elHeader from "@/components/header.vue";
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "login",
  components: {
    elHeader,
  },
  setup() {
    const formState = reactive({
      a: "",
      b: "",
      c: "",
    });
    const store = useStore();

    const router = useRouter();
    const minimize = () => {
      ipcRenderer.send("minimize");
    };

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
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
      formState,
      onFinish,
      onFinishFailed,
      login,
    };
  },
});
</script>
<style lang="less" scoped>
.ant-form-item-required {
  display: none;
}
.main {
  background: #252c49;
  height: 100vh;
  opacity: 0.9;
  .content {
    padding: 0 35px;
    .title {
      color: #fff;
      text-align: center;
      padding: 10px 0px;
      font-size: 18px;
    }
    .elItem {
      color: #fff;
      margin-right: 60px;
    }
  }
}
</style>