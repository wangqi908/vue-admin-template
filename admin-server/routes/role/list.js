// list
const UserModel = require('../../db/models').UserModel
const filter = { __v: 0, password: 0 } // 查询时过滤出指定的属性

const list = (req, res) => {
  // 先找到id对应的账户,拿到头像路径以便删除
  UserModel.find({}, filter, (err, data) => {
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
