// 移除
const UserModel = require('../../db/models').UserModel
const unlinkFile = require('../../utils/unlinkFile').unlinkFile

const remove = (req, res) => {
  let { ids } = req.body
  let idArr = { $in: ids }
  // 先找到id对应的账户,拿到头像路径以便删除
  UserModel.find({ _id: idArr }, async (err, doc) => {
    if (err) {
      res.send({ code: 0, data: err })
      return
    }
    // 删除该账户对应的图片
    doc.forEach(ele => {
      let avatar = ele.avatar
      if (avatar && avatar != '') {
        unlinkFile(avatar)
      }
    })
    // 删除账户
    UserModel.deleteMany({ _id: idArr }, (err, doc) => {
      if (err) {
        res.send({ code: 0, data: err })
        return
      }
      res.send({ code: 200, data: doc })
    })
  })
};

module.exports = {
  remove
};
