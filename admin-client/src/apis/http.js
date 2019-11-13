/*
使用axios 封装的ajax 请求函数
函数返回的是promise 对象
*/
import axios from 'axios'
axios.defaults.retryDelay = 10000; // 设置超时时间
// axios.defaults.baseURL = `http://localhost:4000`
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

    return response;
  },
  error => {

    return Promise.reject(error);
  });


export default function req(url, data = {}, method = "GET") {
  method = method.toLowerCase();
  if (method === 'post') {
    return axios.post(url, data)
  } else if (method === 'get') {
    return axios.get(url, {
      params: data
    })
  } else if (method === 'delete') {
    return axios.delete(url, data)
  } else if (method === 'put') {
    return axios.put(url, data)
  } else {
    console.error('未知的method' + method)
    return false
  }
}