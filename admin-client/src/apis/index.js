import req from "./http.js"

export const loginReq = params => req('/login', params, 'post') //登录
export const registerReq = params => req('/register', params, 'post') //注册
export const uploadReq = params => req('/upload', params, "form-data") //文件上传

// 用户模块
export const userInfoReq = params => req('/user/info', params, "get") //获取用户信息
export const userListReq = params => req('/user/list', params, 'post') //用户list
export const userPageReq = params => req('/user/page', params, 'post') //用户分页
export const userViewReq = params => req('/user/view', params, 'post') //用户详情
export const userAddReq = params => req('/user/add', params, 'post') //用户添加
export const userEditReq = params => req('/user/edit', params, 'post') //用户编辑
export const userRemoveReq = params => req('/user/remove', params, 'post') //用户删除

// 权限模块
export const permissionTreeReq = params => req('/permission/tree') //权限tree