import axios from 'axios'
import Vue from 'vue'
const axiosConfig = () => {
  axios.defaults.retryDelay = 10000; // 设置超时时间
  axios.defaults.baseURL = `http://localhost:3000`
  axios.interceptors.request.use(
    config => {
      return config;
    },
    err => {
      return Promise.reject(err);
    });

  // 响应拦截（配置请求回来的信息）
  axios.interceptors.response.use(
    response => {

      if (response.data.code !== 200) {
        let { msg } = response.data
        Vue.prototype.$message.warning(msg);
      }

      return response;
    },
    error => {

      return Promise.reject(error);
    });
}

export default axiosConfig