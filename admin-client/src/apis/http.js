/*
使用axios 封装的ajax 请求函数
函数返回的是promise 对象
*/
import axios from 'axios'
import store from '../store'

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
  } else if (method === 'form-data') {
    let config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: progressEvent => {
        let progress = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
        store.commit("setUploadProgress", progress)
      }
    }
    return axios.post(url, data, config)
  } else {
    console.error('未知的method' + method)
    return false
  }
}