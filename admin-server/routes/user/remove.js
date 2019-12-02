// 编辑
const UserModel = require('../../db/models').UserModel

const remove = (req, res) => {
  let { ids } = req.body
  let idArr = { $in: ids }
  UserModel.remove({ _id: idArr }, (err, doc) => {
    if (err) res.send({ code: 0, data: err })
    res.send({ code: 200, data: doc })
  })
};

module.exports = {
  remove
};
