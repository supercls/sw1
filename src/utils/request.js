import axios from "axios";
import logger from "@/utils/log";
const { dialog } = window.require("electron").remote;
const service = axios.create({
  baseURL: "/gcc",
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
    if (error && error.response) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (error.response.status) {
        case 400:
          error.message = "错误请求";
          break;
        case 401:
          error.message = "未授权，请重新登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求错误,未找到该资源";
          // window.location.href = "/NotFound"
          break;
        case 405:
          error.message = "请求方法未允许";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器端出错";
          break;
        case 501:
          error.message = "网络未实现";
          break;
        case 502:
          error.message = "网络错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网络超时";
          break;
        case 505:
          error.message = "http版本不支持该请求";
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      }
    } else {
      // 超时处理
      if (JSON.stringify(error).includes("timeout")) {
        dialog.showErrorBox("提示", "服务器响应超时，请刷新当前页");
        logger.error(`request:${error}`);
      }
    }

    return Promise.reject(error.response);
  }
);
export default service;
