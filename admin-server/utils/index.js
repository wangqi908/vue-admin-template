const PermissionSchema = require('../db/models').PermissionSchema
const RoleSchema = require('../db/models').RoleSchema
const filter = { __v: 0 } // 查询时过滤出指定的属性

// 权限list转成tree
const filterArray = (data, p_id) => {
  let tree = []
  let temp

  for (let i = 0; i < data.length; i++) {
    if (data[i].p_id == p_id) {
      let obj = data[i]
      temp = filterArray(data, data[i]._id)
      if (temp.length > 0) {
        obj.children = temp
      }
      tree.push(obj)
    }
  }
  return tree
}

// 通过权限ids拿到权限树
const getPermissionByPermissionIds = (ids, type = 'tree') => {
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
        if (permissionIds.indexOf(ele._id + '')) {
          permissionIds.push(ele._id + '')
        }
      })
      let allPermissions = permissionList.filter(ele => permissionIds.indexOf(ele._id + '') > -1)
      let tree = filterArray(JSON.parse(JSON.stringify(allPermissions)))
      type === 'tree' ? resolve(tree) : resolve(allPermissions)
    }).sort({ index: 1 })
  })
}

// 返回角色权限
const getRoleInfo = _id => {
  return new Promise((resolve, reject) => {
    RoleSchema.findOne({ _id }, filter, async (err, role) => {
      if (err) {
        reject(err)
        return
      }
      if (!role) {
        reject('无此信息')
        return
      }
      const tree = await getPermissionByPermissionIds(role.ids)
      const list = await getPermissionByPermissionIds(role.ids, 'list')
      let _role = JSON.parse(JSON.stringify(role))
      let data = {
        ..._role,
        tree,
        list
      }
      resolve(data)
    })
  })
}

const uniqueArr = (arr, id = '_id') => {
  if (arr.length === 0) return []
  return arr.reduce((prev, cur) => {
    let hasId = prev.some(ele => {
      return ele[id] + '' === cur[id] + ''
    })
    return hasId ? prev : [...prev, cur]
  }, [])
}
module.exports = {
  filterArray,
  getPermissionByPermissionIds,
  getRoleInfo,
  uniqueArr
}
