// list
const RoleSchema = require('../../db/models').RoleSchema
const filter = { __v: 0 } // 查询时过滤出指定的属性

const list = (req, res) => {
  RoleSchema.find({}, filter, (err, data) => {
    if (err) {
      res.send({ code: 0, data: err })
      return
    } else {
      res.send({ code: 200, data })
    }
  })
};

module.exports = {
  list
};
