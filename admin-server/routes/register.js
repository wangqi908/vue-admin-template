var express = require('express');
var router = express.Router();
// 引入md5 加密函数库
const md5 = require('blueimp-md5')
// 引入UserModel
const UserModel = require('../db/models').UserModel
// const filter = {password: 0} // 查询时过滤出指定的属性

/* GET users listing. */
router.post('/', (req, res) => {
  const { username, password } = req.body
  if (!username) {
    res.send({ code: 0, msg: '请输入用户名' })
    return
  }
  if (!password) {
    res.send({ code: 0, msg: '请输入密码' })
    return
  }
  // 2. 处理数据
  // 3. 返回响应数据
  // 2.1. 根据username 查询数据库, 看是否已存在user
  UserModel.findOne({ username }, (err, user) => {
    // 3.1. 如果存在, 返回一个提示响应数据: 此用户已存在
    if (user) {
      res.send({ code: 0, msg: '此用户已存在' }) // code 是数据是否是正常数据的标识
    } else {
      new UserModel({ username, password: md5(password) }).save((err, user) => {
        // 3.2. 保存成功, 返回成功的响应数据: user
        res.send({ code: 200, data: { _id: user._id, username } }) // 返回的数据中不要携带pwd
      })
    }
  })
});

module.exports = router;
