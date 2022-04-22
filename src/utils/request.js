import axios from "axios";
import logger from "@/utils/log";
import { message } from 'ant-design-vue';
const { dialog } = window.require("electron").remote;

const service = axios.create({
  baseURL:
    process.env.NODE_ENV !== "production"
      ? "/gcc"
      : process.env.VUE_APP_APIHOST,
  timeout: 0,
});

// 2.请求拦截器
service.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
    config.headers = {
      "Content-Type": "application/json;charset=UTF-8", //配置请求头
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 3.响应拦截器
service.interceptors.response.use(
  (response) => {
    if (response.config.responseType == "blob") {
      return response;
    }
    if (
      response.headers["content-type"].indexOf("application/vnd.ms-excel") != -1
    ) {
      return response;
    }

    if (response.data.meta.code == "0000") {
      return response.data;
    } else {
      dialog.showErrorBox("提示", response.data.meta.msg);
      logger.error(`request:${JSON.stringify(response)}`);
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error ) {
      message.warning('服务器正在启动，请稍后点击重试');
    } else {
      // 超时处理
      if (JSON.stringify(error).includes("timeout")) {
        dialog.showErrorBox("提示", "服务器响应超时");
        logger.error(`request:${error}`);
      }
    }

    return Promise.reject(error.response);
  }
);
export default service;
