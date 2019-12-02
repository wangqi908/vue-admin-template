// 编辑
const UserModel = require('../../db/models').UserModel
const remove = require('../../utils/remove').remove //保存到永久文件夹
const md5 = require('blueimp-md5')

const add = (req, res) => {
  const { username, password, avatar, remark } = req.body
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
  UserModel.findOne({ username }, async (err, user) => {
    // 3.1. 如果存在, 返回一个提示响应数据: 此用户已存在
    if (user) {
      res.send({ code: 0, msg: '此用户已存在' }) // code 是数据是否是正常数据的标识
    } else {
      try {
        const newAvatarPath = await remove(avatar) //头像新路径
        let Model = new UserModel({ username, password: md5(password), avatar: newAvatarPath, remark: remark || "" })
        Model.save((err, user) => {
          // 3.2. 保存成功, 返回成功的响应数据: user
          res.send({ code: 200, data: { _id: user._id, username } }) // 返回的数据中不要携带pwd
        })
      } catch (error) {
        res.send({ code: 0, data: error }) // 返回的数据中不要携带pwd
      }
    }
  })
};

module.exports = {
  add
};
