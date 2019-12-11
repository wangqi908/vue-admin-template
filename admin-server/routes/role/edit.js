// 编辑
const RoleSchema = require('../../db/models').RoleSchema

const edit = (req, res) => {
  let { _id } = req.body
  RoleSchema.updateOne({ _id }, req.body, (err, doc) => {
    if (err) {
      res.send({ code: 0, data: err })
      return
    }
    res.send({ code: 200, data: doc })
  })
};

module.exports = {
  edit
};
