// 删除
const RoleSchema = require('../../db/models').RoleSchema

const remove = (req, res) => {
  let { ids } = req.body
  let idArr = { $in: ids }
  RoleSchema.deleteMany({ _id: idArr }, (err, doc) => {
    if (err) {
      res.send({ code: 0, data: err })
      return
    }
    res.send({ code: 200, data: doc })
  })
};

module.exports = {
  remove
};
