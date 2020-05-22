## admin-server(后台)

### 技术栈

| 名称     | 说明     |
| :------- | :------- |
| node     | node     |
| express  | express  |
| mongodb  | mongodb  |
| mongoose | mongoose |

### 插件

| 名称            | 说明         |
| :-------------- | :----------- |
| blueimp-md5     | 转 md5       |
| jsonwebtoken    | 生成 token   |
| multer          | 文件上传     |
| express-session | 生成 session |
| svg-captcha     | 生成验证码   |

### 功能

```
- 登录 / 注销

- 权限管理
  - 用户管理
  - 角色管理
  - 权限管理

- 图片上传
- 图片文字识别(调用百度智能接口)

```

### 开发

```
# 克隆项目
git clone https://github.com/wangqi908/vue-admin-template.git

# 安装依赖
npm install

# 启动服务
npm start

# BaseUrl
http://localhost:3000/api/
```

### 接口文档

#### 登录模块

##### 验证码

**请求 URL：**

- `/captcha`

**请求方式：**

- GET

##### 登录

**请求 URL：**

- `/login`

**请求方式：**

- POST

**参数：**

| 参数名   | 必选 | 类型   | 说明   |
| :------- | :--- | :----- | ------ |
| username | 是   | string | 用户名 |
| password | 是   | string | 密码   |

**请求示例**

```json
{
  "username": "wq123",
  "password": "qwer1234"
}
```

##### 注册

**请求 URL：**

- `/register`

**请求方式：**

- POST

**参数：**

| 参数名   | 必选 | 类型   | 说明     |
| :------- | :--- | :----- | -------- |
| username | 是   | string | 用户名   |
| password | 是   | string | 密码     |
| avatar   | 否   | string | 头像路径 |

**请求示例**

```json
{
  "username": "admin",
  "password": "admin",
  "avatar": "temp_files/15774273399250.jpeg"
}
```

##### 文件上传

**请求 URL：**

- `/upload`

**请求方式：**

- POST

**参数：**

| 参数名 | 必选 | 类型 | 说明     |
| :----- | :--- | :--- | -------- |
| file   | 是   | File | 表单文件 |

**返回示例**

```json
{
  "code": 200,
  "data": {
    "http": "http://192.168.10.78:3000/",
    "fileList": ["temp_files/15774276227190.gif"]
  }
}
```

#### 百度智能模块

##### 文字识别

**请求 URL：**

- `/bdAi/ocr`

**请求方式：**

- POST

**参数：**

| 参数名 | 必选 | 类型   | 说明            |
| :----- | :--- | :----- | --------------- |
| image  | 是   | base64 | base64 格式图片 |

**请求示例**

```json
{
  "image": "iVBORw0KGgoAAAANSUhEUgAAAN8AAADACAYAAACEebZiAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAUTSURBVHhe7dvtceIwFIbR1EVB1EM1aSbFsAlfMXBtC4J5tXDOzP2zYUyY8RMJwX5sgQjxQYj4IER8ECI+CBEfhIgPQsQHIeKDEPFBiPggRHwQIj4IER+EiA9CxAch4oMQ8UGI+CBEfBAiPggRH4SID0LEByHigxDxQYj4IER8ECI+CBEfhIgPQsQHIeKDEPFBiPggRHwQIj4IER+EiA9CxAch4oMQ8UGI+CBEfBAiPggRH4SID0LEByHigxDxQYj4IER8ECI+CBEfhIgPQsQHIeKDEPFBiPggRHwQIj4IER+EiA9CxAch4oMQ8UGI+CBEfBAiPggRH4SID0LEByHigxDxQYj4IER8ECI+CBEfhIgPQsQHIeKDEPEVvjar7cfHx37Wn4d/hccS39HXZrs6Bnc2621v+X2ur3/P1ebr8NNfu8f549Et8Q1UN/XYjZ00F9/Zyn3xM/ohvqHP9dlNe5rVZtvT7TsV32V4x7EA9udF4/vcrosb8Lmz3Ha1Cmxq5dtPf9vndye+xSYX349yC23564r4FptsfN+P2m5Wh593tm1mT3yLTR3f2Huy543tZy/Et9iIj2lvFN9qu9iJe/kZofiYJr5HEB93eNH4+lXFd/MhZPV5pJPM/857xDf61bEHT8Op4kPiq16P+P474nvkdBaf73b2TXyPnGR8l899+Rif9XVHfI+cO+NrnlOlxYHSxXOX33ARYFfE98hZOL7fb7EMvr1ymsEp5sgXxO1A+/Ie8XVk+fhGvmBg1euO+J7sMfFV28r955jldvN7rHr9ec34xv5f3rOnuOObD1yK1zCMr7zOeuR1K69L4lty/hBf9bi5+OpZ8Js9/In4lpym+Oo4ZiNtfI3DYOmL+JacIr6x92qXZuNrOcF1yNI18S05V/FVp5R1fNXByfnlqmsN53jdn9NPX6bu0WvG16A8FbyK5dH/O6K6XhVGW6RjJ5s/c9punq2QIuzJm8ZXrxrX749uie9wzWKreVJtFautYblyX4YzsfINf4fqWlO/I0/zlvHVJ4VVVHfEN/XYsRCatsnD+CbCu4i5eq0OYfrwfvGN3ejl4cQt8c0/ttom7kJoOTw5rVbV85zPMK75946kvFV89Yq3n3o1uCG+MqDhalVHsw9hPqjd41oiPcz4dcf+ePBs7xHf7LZu7CCijuI61JFt4GA1nd7qTmwjv2f3fE1b04bx8UM3Xjq+qdPA35laCeZXpMmZ2yqeQhiLb/+7tb2OxrHn7MYLxje9ipzP3Bbslmtdz/E+H9vu1lvdofnn31+j/Y+E9vrxoitfy83Y9pnX/avOxfWv3q/d8N5rZMt5FlLL+0Fbzq687rZz4j3S/IozdM/WcyyswUp26xJ09npG/nDMBGjV68t7vef7w93XvALOPsdPgG2r7qXd9rXhNVxvc+97Ppb10vEdV63bVjp4jhePD/olPggRH4SID0LEByHigxDxQYj4IER8ECI+CBEfhIgPQsQHIeKDEPFBiPggRHwQIj4IER+EiA9CxAch4oMQ8UGI+CBEfBAiPggRH4SID0LEByHigxDxQYj4IER8ECI+CBEfhIgPQsQHIeKDEPFBiPggRHwQIj4IER+EiA9CxAch4oMQ8UGI+CBEfBAiPggRH4SID0LEByHigxDxQYj4IER8ECI+CBEfhIgPQsQHIeKDEPFBiPggRHwQIj4IER+EiA9CxAch4oMQ8UGI+CBEfBAiPggRH0Rst/8A/oFxVvAlXRMAAAAASUVORK5CYII="
}
```

#### 用户模块

##### 用户新增

**请求 URL：**

- `/user/add`

**请求方式：**

- POST

**参数：**

| 参数名   | 必选 | 类型   | 说明     |
| :------- | :--- | :----- | -------- |
| username | 是   | string | 用户名   |
| password | 是   | string | 密码     |
| remark   | 否   | string | 备注     |
| roleIds  | 否   | array  | 角色 ids |
| avatar   | 否   | string | 头像路径 |

**请求示例**

```json
{
  "username": "admin",
  "password": "admin",
  "remark": "备注",
  "roleIds": ["5df0966cd945ac276ca0eab9", "5df094aad945ac276ca0eab8"]
}
```

##### 用户删除

**请求 URL：**

- `/user/remove`

**请求方式：**

- POST

**参数：**

| 参数名 | 必选 | 类型  | 说明     |
| :----- | :--- | :---- | -------- |
| ids    | 是   | array | 用户 ids |

**请求示例**

```json
{
  "ids": ["5de47d1ed438e32b94ecaa50"]
}
```

##### 用户修改

**请求 URL：**

- `/user/remove`

**请求方式：**

- POST

**参数：**

| 参数名   | 必选 | 类型   | 说明     |
| :------- | :--- | :----- | -------- |
| id       | 是   | string | 用户 id  |
| username | 否   | string | 用户名   |
| password | 否   | string | 密码     |
| remark   | 否   | string | 备注     |
| roleIds  | 否   | array  | 角色 ids |
| avatar   | 否   | string | 头像路径 |

**请求示例**

```json
{
  "_id": "5df18c599ddebf0e40dc54e9",
  "remark": "备注11",
  "username": "admin",
  "password": "admin",
  "remark": "备注",
  "roleIds": ["5df0966cd945ac276ca0eab9", "5df094aad945ac276ca0eab8"]
}
```

##### 用户查询

**请求 URL：**

- `/user/view`

**请求方式：**

- POST

**参数：**

| 参数名 | 必选 | 类型   | 说明    |
| :----- | :--- | :----- | ------- |
| id     | 是   | string | 用户 id |

**请求示例**

```json
{
  "_id": "5df2004bec325c348c6675a0"
}
```

##### 用户分页

**请求 URL：**

- `/user/page`

**请求方式：**

- POST

**参数：**

| 参数名   | 必选 | 类型   | 说明         |
| :------- | :--- | :----- | ------------ |
| pageSize | 是   | number | 每页返回条数 |
| pageNum  | 是   | number | 页码         |

**请求示例**

```json
{
  "pageSize": 4,
  "pageNum": 0,
  "data": {}
}
```

##### 获取个人信息

**请求 URL：**

- `/user/info`

**请求方式：**

- GET

#### 角色模块

##### 角色新增

**请求 URL：**

- `/role/add`

**请求方式：**

- POST

**参数：**

| 参数名 | 必选 | 类型   | 说明     |
| :----- | :--- | :----- | -------- |
| name   | 是   | string | 角色名   |
| remark | 是   | string | 备注     |
| ids    | 是   | array  | 权限 ids |

**请求示例**

```json
{
  "name": "测试5",
  "remark": "备注",
  "ids": [
    "5df04d70032a0000e50030d2",
    "5df072cc4d19000004005982",
    "5df072f84d19000004005983",
    "5df04e87032a0000e50030d3",
    "5df04eda032a0000e50030d4",
    "5df04f13032a0000e50030d5"
  ]
}
```

##### 角色删除

**请求 URL：**

- `/role/remove`

**请求方式：**

- POST

**参数：**

| 参数名 | 必选 | 类型  | 说明     |
| :----- | :--- | :---- | -------- |
| ids    | 是   | array | 角色 ids |

**请求示例**

```json
{
  "ids": ["5df086a8b5f6792af4e48001", "5df086cbb5f6792af4e48002"]
}
```

##### 角色修改

**请求 URL：**

- `/role/edit`

**请求方式：**

- POST

**参数：**

| 参数名 | 必选 | 类型   | 说明     |
| :----- | :--- | :----- | -------- |
| \_id   | 是   | string | 角色 id  |
| name   | 否   | string | 角色名   |
| remark | 否   | string | 备注     |
| ids    | 否   | array  | 权限 ids |

**请求示例**

```json
{
  "_id": "5df086a8b5f6792af4e48001",
  "name": "测试",
  "remark": "1备11注1",
  "ids": ["5df04d70032a0000e50030d2", "5df072cc4d19000004005982", "5df072f84d19000004005983"]
}
```

##### 角色详情

**请求 URL：**

- `/role/view`

**请求方式：**

- POST

**参数：**

| 参数名 | 必选 | 类型   | 说明    |
| :----- | :--- | :----- | ------- |
| \_id   | 是   | string | 角色 id |

**请求示例**

```json
{
  "_id": "5df0966cd945ac276ca0eab9"
}
```

##### 角色分页

**请求 URL：**

- `/role/page`

**请求方式：**

- POST

**参数：**

| 参数名   | 必选 | 类型   | 说明         |
| :------- | :--- | :----- | ------------ |
| pageSize | 是   | number | 每页返回条数 |
| pageNum  | 是   | number | 页码         |

**请求示例**

```json
{
  "pageSize": 4,
  "pageNum": 0,
  "data": {}
}
```

##### 角色 list

**请求 URL：**

- `/role/list`

**请求方式：**

- POST

**参数：**

```
实体对象
```

**请求示例**

```json
{}
```

#### 权限模块

##### 获取权限树

**请求 URL：**

- `/permission/tree`

**请求方式：**

- GET
