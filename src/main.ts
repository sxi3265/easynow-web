import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueAxios from "vue-axios";
import axios from "@/utils/axios";
// import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// 引入Antd配置文件
import Antd from "@/plugins/Ant";
import mock from "@/mock";

mock.init();

createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .use(VueAxios, axios)
  .mount("#app");
