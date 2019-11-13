import req from "./http.js"

export const loginReq = params => req('/login', params, 'post') //登录
export const registerReq = params => req('/register', params, 'post') //注册
export const userInfoReq = params => req('/user/info', params, "get") //获取用户信息