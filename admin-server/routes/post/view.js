// 详情
const PostSchema = require('../../db/models').PostSchema
const ipWithPort = require('../../utils/getIp.js').ipWithPort
const filter = { __v: 0 }
const view = (req, res) => {
  let { _id } = req.body
  // 先找到id对应的账户,拿到头像路径以便删除
  PostSchema.findOne({ _id }, filter, async (err, info) => {
    if (err) {
      res.send({ code: 0, data: err })
      return
    }
    if (!info) {
      res.send({ code: 0, msg: '未找到' })
      return
    }
    let data = JSON.parse(JSON.stringify(info))
    data.http = ipWithPort
    res.send({ code: 200, data })
  })
}

module.exports = {
  view
}
