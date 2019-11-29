import req from "./http.js"

export const loginReq = params => req('/login', params, 'post') //登录
export const registerReq = params => req('/register', params, 'post') //注册
export const uploadReq = params => req('/upload', params, "form-data") //文件上传

// 用户模块
export const userInfoReq = params => req('/user/info', params, "get") //获取用户信息
export const userPageReq = params => req('/user/page', params, 'post') //用户分页
