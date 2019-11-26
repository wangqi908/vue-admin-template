import axios from 'axios'
import Vue from 'vue'
import router from '../router'
import store from '../store'

const axiosConfig = () => {
  axios.defaults.retryDelay = 10000; // 设置超时时间
  axios.defaults.baseURL = `http://localhost:3000`
  // axios.defaults.baseURL = `http://localhost:4000`
  axios.interceptors.request.use(
    config => {
      const token = store.state.token
      console.log(token)
      if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = token;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    });

  // 响应拦截（配置请求回来的信息）
  axios.interceptors.response.use(
    response => {
      if (response.data.code === 1) {
        Vue.prototype.$message.warning('登录超时,请重新登录');
        router.push('/login')
      }
      if (response.data.code !== 200 && response.data.code !== 1) {
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