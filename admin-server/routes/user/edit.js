// 编辑
const UserModel = require('../../db/models').UserModel

const edit = (req, res) => {
  let { id } = req.body
  UserModel.updateOne({ _id: id }, req.body, (err, doc) => {
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
