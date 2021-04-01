/**
 * axios配置文件
 */

import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = "/api";
axiosInstance.defaults.timeout = 0;

export default axiosInstance;
