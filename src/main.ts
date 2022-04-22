import { createApp } from 'vue';

// 全局样式
import '@/assets/css/global.less';
import "@/assets/css/variables.less";
import "@/assets/icon/iconfont.css";
// 引入 Antd
import Antd from 'ant-design-vue';

import App from '@/App.vue';
import router from '@/config/routes.js';
import store from '@/store/index.js';


const app = createApp(App)
app.use(store);
app.use(router)
app.use(Antd);
app.mount('#app');
