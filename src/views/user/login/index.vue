<template>
  <div class="main loginT">
    <el-header title="启动与连接" minsize></el-header>
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
          <a-select v-model:value="formState.a" placeholder="请选择通讯方式">
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
          <a-select v-model:value="formState.b" placeholder="请选择串口号">
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
          <a-select v-model:value="formState.c" placeholder="请选择波特率">
            <a-select-option value="1">COM1</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <div class="file">
        <span>日志路径</span>
        <a-input class="input" readonly v-model:value="formState.userName">
        </a-input>
        <p>.....</p>
      </div>
    </div>
    <footer>
      <a-button @click="login" class="button" type="primary" :loading="loading"
        >启动连接</a-button
      >
    </footer>
  </div>
</template>
<script>
const { ipcRenderer } = window.require("electron");
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import elHeader from "@/components/header.vue";
import { defineComponent, reactive, ref } from "vue";
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
    const loading = ref(false);
    const router = useRouter();
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
      formState,
      onFinish,
      loading,
      onFinishFailed,
      login,
    };
  },
});
</script>
<style lang="less" scoped>

.main {
  background: #252c49;
  height: 100vh;
  opacity: 0.9;
  footer {
    text-align: center;
    margin-top: 125px;
    .button {
      width: 130px;
      height: 45px;
      background: #5f83f9;
      border-radius: 4px;
      border: none;
    }
  }
  .content {
    padding: 0 35px;
    .file {
      margin: 50px 0;
      display: flex;
      align-items: center;
      color: #fff;
      span {
        margin-right: 10px;
      }
      .icon-xinxi {
        color: #fff;
      }
      p {
        width: 30px;
        margin: 0 0 0 10px;
        height: 33px;
        background: #1b2137;
        border: 1px solid #434f94;
        text-align: center;
        border-radius: 8px;
        cursor: pointer;
      }
      .input {
        width: 450px;
        background: #1b223c;
        border-color: #7287fd !important;
      }
    }
    .title {
      color: #fff;
      text-align: center;
      padding: 10px 0px;
      font-size: @font18;
    }
    .elItem {
      color: #fff;
      margin-right: 50px;
    }
  }
}
</style>