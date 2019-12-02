// 编辑
const UserModel = require('../../db/models').UserModel
const ipWithPort = require('../../utils/getIp.js').ipWithPort
const filter = { __v: 0, password: 0 } // 查询时过滤出指定的属性

const view = (req, res) => {
  let { _id } = req.body
  // 先找到id对应的账户,拿到头像路径以便删除
  UserModel.find({ _id }, filter, async (err, doc) => {
    if (err) {
      res.send({ code: 0, data: err })
      return
    }
    if (!doc.length) {
      res.send({ code: 0, msg: '未找到用户' })
      return
    }
    let userInfo = doc[0]
    let data = JSON.parse(JSON.stringify(userInfo))
    data.http = ipWithPort
    res.send({ code: 200, data })
  })
};

module.exports = {
  view
};
