// 详情
const RoleSchema = require('../../db/models').RoleSchema
const getPermissionTreeByPermissionIds = require('../../utils').getPermissionTreeByPermissionIds// 通过权限ids拿到权限树
const filter = { __v: 0 } // 查询时过滤出指定的属性

const view = async (req, res) => {
  let { _id } = req.body
  RoleSchema.findOne({ _id }, filter, async (err, role) => {
    if (err) {
      res.send({ code: 0, data: err })
      return
    }
    if (!role) {
      res.send({ code: 0, msg: '无此信息' })
      return
    }

    const tree = await getPermissionTreeByPermissionIds(role.ids)

    let _role = JSON.parse(JSON.stringify(role))
    let data = {
      ..._role,
      tree
    }

    res.send({ code: 200, data })

  })
};

module.exports = {
  view
};
