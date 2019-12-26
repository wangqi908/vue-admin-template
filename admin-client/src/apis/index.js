import req from "./http.js"

export const loginReq = params => req('/login', params, 'post') //登录
export const registerReq = params => req('/register', params, 'post') //注册
export const uploadReq = params => req('/upload', params, "form-data") //文件上传
export const generalBasicReq = params => req('bdAi/ocr', params, 'post') //文字识别

// 用户模块
export const userInfoReq = params => req('/user/info', params, "get") //获取用户信息
export const userListReq = params => req('/user/list', params, 'post') //用户list
export const userPageReq = params => req('/user/page', params, 'post') //用户分页
export const userViewReq = params => req('/user/view', params, 'post') //用户详情
export const userAddReq = params => req('/user/add', params, 'post') //用户添加
export const userEditReq = params => req('/user/edit', params, 'post') //用户编辑
export const userRemoveReq = params => req('/user/remove', params, 'post') //用户删除

// 角色-权限模块
export const permissionTreeReq = params => req('/permission/tree') //权限tree
export const roleListReq = params => req('/role/list', params, 'post') //list
export const rolePageReq = params => req('/role/page', params, 'post') //分页
export const roleViewReq = params => req('/role/view', params, 'post') //详情
export const roleAddReq = params => req('/role/add', params, 'post') //添加
export const roleEditReq = params => req('/role/edit', params, 'post') //编辑
export const roleRemoveReq = params => req('/role/remove', params, 'post') //删除
