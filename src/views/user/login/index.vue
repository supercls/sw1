<template>
  <div class="main loginT">
    <el-header title="启动与连接" minsize></el-header>
    <div class="content">
      <p class="title">赛为地面站1.0</p>
      <a-form
        :model="formState"
        ref="formref"
        style="margin-left: 30px"
        name="basic"
        layout="inline"
        autocomplete="off"
      >
        <a-form-item
          label="通讯方式"
          :colon="false"
          class="elItem"
          name="name"
          :rules="[{ required: true, message: '请选择通讯方式' }]"
        >
          <a-select
            disabled
            v-model:value="formState.name"
            placeholder="请选择通讯方式"
          >
            <a-select-option value="1">串口通信</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="串口号"
          class="elItem"
          :colon="false"
          name="serialPortNumber"
          :rules="[{ required: true, message: '请选择串口号' }]"
        >
          <a-select
            v-model:value="formState.serialPortNumber"
            @click="getList"
            placeholder="请选择串口号"
          >
            <a-select-option
              v-for="(option, index) in options"
              :key="index * 0.1"
              :value="option"
              >{{ option }}</a-select-option
            >
          </a-select>
        </a-form-item>

        <a-form-item
          label="波特率"
          class="elItem"
          :colon="false"
          name="baudRate"
          :rules="[{ required: true, message: '请选择波特率' }]"
        >
          <a-select
            v-model:value="formState.baudRate"
            placeholder="请选择波特率"
          >
            <a-select-option
              v-for="(option, index) in boteoption"
              :key="index * 0.2"
              :value="option.value"
              >{{ option.value }}</a-select-option
            >
          </a-select>
        </a-form-item>
      </a-form>
      <!-- <div class="file">
        <span>日志路径</span>
        <a-input
          class="input"
          :maxlength="30"
          v-model:value="formState.logPath"
        >
        </a-input>
        <p>.....</p>
      </div> -->
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
import { boteList } from "@/utils/arrayList";
import { getPorts, openPort } from "./service";
import { uavSocket } from "@/utils/websocket.js";
import { Electronwindow } from "@/utils/openWindow";

import { defineComponent, reactive, ref, onMounted, toRaw } from "vue";
export default defineComponent({
  name: "login",
  components: {
    elHeader,
  },
  setup() {
    const formState = reactive({
      name: "1",
      serialPortNumber: "",
      baudRate: "",
    });
    const options = ref([]);
    const formref = ref(null);
    const boteoption = ref(boteList);
    const store = useStore();
    const loading = ref(false);
    const router = useRouter();
    const login = async () => {
      formref.value
        .validate()
        .then(() => {
          loading.value = true;
          openPort({
            ...toRaw(formState),
          })
            .then((res) => {
              store.dispatch("setToken", res.data.uid);
              setTimeout(() => {
                ipcRenderer.send("changWindowSize");
                uavSocket();
                router.replace({
                  path: "/home/workplace",
                });
                setTimeout(() => {
                  Electronwindow("/home/flycheck", 650, 700, "#/home/flycheck");
                }, 3000);
              }, 1000);
            })
            .catch((e) => {
              loading.value = false;
            });
        })
        .catch((err) => {
          loading.value = false;
          console.log("error", err);
        });
    };
    const getList = () => {
      getPorts().then((res) => {
        options.value = res.data.ports;
      });
    };
    onMounted(() => {
      getList();
      setTimeout(() => {
        getList();
      }, 6000);
    });
    return {
      formState,
      boteoption,
      options,
      getList,
      loading,
      login,
      formref,
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
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 50px;
    .button {
      width: 130px;
      height: 45px;
      background: #5f83f9;
      border-radius: 4px;
      border: none;
    }
  }
  .content {
    padding: 50px 35px 0 35px;
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
      padding: 20px 0px 60px 0px;
      font-size: @font18;
    }
    .elItem {
      color: #fff;
      margin-right: 50px;
    }
  }
}
</style>