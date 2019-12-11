// 详情
const RoleSchema = require('../../db/models').RoleSchema
const PermissionSchema = require('../../db/models').PermissionSchema
const filterArray = require('../../utils').filterArray
const filter = { __v: 0 } // 查询时过滤出指定的属性

// 通过权限ids拿到权限树
const getPermissionTreeByPermissionIds = ids => {
  return new Promise((resolve, reject) => {
    PermissionSchema.find((err, permissionList) => {
      if (err) {
        reject(err)
        return
      }
      let permissions = permissionList.filter(ele => ids.indexOf(ele._id) > -1)
      let permissionIds = []
      permissions.forEach(ele => {
        if (ele.p_id != null && permissionIds.indexOf(ele.p_id)) {
          permissionIds.push(ele.p_id)
        }
        if (permissionIds.indexOf(ele._id + "")) {
          permissionIds.push(ele._id + "")
        }
      })
      let allPermissions = permissionList.filter(ele => permissionIds.indexOf(ele._id + "") > -1)
      let tree = filterArray(JSON.parse(JSON.stringify(allPermissions)))
      resolve(tree)
    }).sort({ index: 1 })
  })

}

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
