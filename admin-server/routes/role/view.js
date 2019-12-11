// 详情
const RoleSchema = require('../../db/models').RoleSchema
const filter = { __v: 0 } // 查询时过滤出指定的属性

const view = (req, res) => {
  let { _id } = req.body
  RoleSchema.find({ _id }, filter, async (err, doc) => {
    if (err) {
      res.send({ code: 0, data: err })
      return
    }
    if (!doc.length) {
      res.send({ code: 0, msg: '无此信息' })
      return
    }
    res.send({ code: 200, data: doc[0] })
  })
};

module.exports = {
  view
};
