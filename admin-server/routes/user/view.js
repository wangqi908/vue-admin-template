// 详情
const UserModel = require('../../db/models').UserModel
const ipWithPort = require('../../utils/getIp.js').ipWithPort
const filter = { __v: 0, password: 0 } // 查询时过滤出指定的属性
const getRoleInfo = require('../../utils').getRoleInfo// 角色详情
const view = (req, res) => {
  let { _id } = req.body
  // 先找到id对应的账户,拿到头像路径以便删除
  UserModel.findOne({ _id }, filter, async (err, userInfo) => {
    if (err) {
      res.send({ code: 0, data: err })
      return
    }
    if (!userInfo) {
      res.send({ code: 0, msg: '未找到用户' })
      return
    }
    let data = JSON.parse(JSON.stringify(userInfo))
    data.http = ipWithPort
    let roleIds = userInfo.roleIds
    if (roleIds) {
      let roles = []
      for (let index = 0; index < roleIds.length; index++) {
        const element = roleIds[index];
        const roleInfo = await getRoleInfo(element)
        roles.push(roleInfo)
      }
      data.roles = roles
    }
    res.send({ code: 200, data })
  })
};

module.exports = {
  view
};
