// list
const PropSchema = require('../../db/models').PropSchema
const filter = { __v: 0 } // 查询时过滤出指定的属性

const list = (req, res) => {
  PropSchema.find({}, filter, (err, data) => {
    if (err) {
      res.send({ code: 0, data: err })
      return
    } else {
      res.send({ code: 200, data })
    }
  }).sort({ _id: -1 })
}

module.exports = {
  list
}
