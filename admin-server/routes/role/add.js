// 编辑
const RoleSchema = require('../../db/models').RoleSchema

const add = (req, res) => {
  const { name, remark, ids } = req.body
  if (!name) {
    res.send({ code: 0, msg: '请输入角色名' })
    return
  }

  RoleSchema.findOne({ name }, async (err, doc) => {
    if (doc) {
      res.send({ code: 0, msg: '此角色已存在' })
    } else {
      let Model = new RoleSchema({ name, remark: remark || "", ids: ids || [] })
      Model.save((err, doc) => {
        res.send({ code: 200, data: doc })
      })
    }
  })
};

module.exports = {
  add
};
