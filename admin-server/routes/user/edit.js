// 编辑
const UserModel = require('../../db/models').UserModel
const unlinkFile = require('../../utils/unlinkFile').unlinkFile
const remove = require('../../utils/remove').remove //保存到永久文件夹
const md5 = require('blueimp-md5')

const edit = (req, res) => {
  let { _id } = req.body
  // 先找到id对应的账户,拿到头像路径以便删除
  UserModel.find({ _id }, async (err, doc) => {
    if (err) {
      res.send({ code: 0, data: err })
      return
    }
    if (!doc.length) {
      res.send({ code: 0, msg: '未找到用户' })
      return
    }
    let userInfo = doc[0]
    let newInfo = JSON.parse(JSON.stringify(req.body))
    let avatar = userInfo.avatar

    let isChange = avatar.split("/")[0] !== 'files' //是否需要更换头像
    // 如果之前有图片,且需要更换图片 先删除之前的图片 然后更换图片新路径
    if (avatar && newInfo.avatar && isChange) {
      unlinkFile(avatar)
    }
    //头像新路径
    if (newInfo.avatar && isChange) {
      const newAvatarPath = await remove(newInfo.avatar)
      newInfo.avatar = newAvatarPath
    }
    // 如果修改密码
    if (newInfo.password) {
      newInfo.password = md5(newInfo.password)
    }
    // 修改账户
    UserModel.updateOne({ _id }, newInfo, (err, doc) => {
      if (err) {
        res.send({ code: 0, data: err })
        return
      }
      res.send({ code: 200, data: doc })
    })
  })
};

module.exports = {
  edit
};
