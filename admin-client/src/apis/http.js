/*
使用axios 封装的ajax 请求函数
函数返回的是promise 对象
*/
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { showFullScreenLoading, tryHideFullScreenLoading, endLoading } from './loading'
// export const baseURL = 'http://192.168.10.106/api/' //测试
export const baseURL = 'http://localhost:8889/' //测试

export const timeout = 20000 // 设置超时时间

axios.defaults.baseURL = baseURL
axios.defaults.timeout = timeout

axios.interceptors.request.use(
  config => {
    const token = store.state.token
    if (token) config.headers.Authorization = `Bearer ${token}`
    showFullScreenLoading()

    // 如果请求超时,自动取消loading
    setTimeout(() => {
      endLoading()
    }, timeout)

    return config
  },
  error => {
    tryHideFullScreenLoading()
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    tryHideFullScreenLoading()
    if (response.data.msg === 'Token Invalid') {
      // 登录超时
      let returnPath = router.history.current.fullPath
      router.push(`/login?re=${decodeURIComponent(returnPath)}`)
    } else if (response.data.code === 0) {
      Vue.prototype.$message.warning({
        message: response.data.msg,
        duration: 1500
      })
    } else if (response.data.code && response.data.code !== 200) {
      Vue.prototype.$message.warning({
        message: response.data.msg,
        duration: 1500
      })
    }

    return response
  },
  error => {
    tryHideFullScreenLoading()
    if (!error.response) {
      // 处理响应失败
      Vue.prototype.$message.error({
        message: '服务器超时',
        duration: 1500
      })
      return Promise.reject(error)
    } else if (error.response.data.msg === 'Token Invalid') {
      // 登录超时
      let returnPath = router.history.current.fullPath
      router.push(`/login?re=${decodeURIComponent(returnPath)}`)
      return Promise.reject(error)
    } else {
      // 处理响应失败
      Vue.prototype.$message.error({
        message: error.response.data.msg,
        duration: 1500
      })
      return Promise.reject(error)
    }
  }
)

export default function req(url, params = {}, method = 'GET', arr) {
  method = method.toLowerCase()
  if (method === 'post') {
    return axios.post(url, params)
  } else if (method === 'get') {
    return axios.get(url, {
      params
    })
  } else if (method === 'delete') {
    return axios.delete(url, params)
  } else if (method === 'put') {
    return axios.put(url, params)
  } else if (method == 'querypost') {
    // 拼接参数的post
    return axios({
      method: 'post',
      url,
      params
    })
  } else if (method == 'blob') {
    // 文件流
    return axios({
      method: 'get',
      url,
      params,
      responseType: 'blob'
    })
  } else if (method === 'upload') {
    let config = {
      headers: { 'Content-Type': 'multipart/form-data' }
      // onUploadProgress: progressEvent => {
      //   let progress = (((progressEvent.loaded / progressEvent.total) * 100) | 0) + '%'
      //   store.commit('setUploadProgress', progress)
      // }
    }
    return axios.post(url, params, config)
  } else if (method == 'all') {
    return axios.all(arr)
  } else {
    console.error('未知的method' + method)
    return false
  }
}
