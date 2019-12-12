// 详情
const tokenTool = require('../../utils/token.js')
const ipWithPort = require('../../utils/getIp.js').ipWithPort
const filter = { password: 0, __v: 0 } // 查询时过滤出指定的属性
const UserModel = require('../../db/models').UserModel
const getRoleInfo = require('../../utils').getRoleInfo// 角色详情

const info = (req, res) => { // 查找群详细信息
  let { authorization } = req.headers
  let verifyToken = tokenTool.verifyToken(authorization)
  let { _id, username } = verifyToken
  UserModel.findOne({ _id, username }, filter, async (err, userInfo) => {
    if (userInfo) {
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
    } else {
      res.send({ code: 200, msg: "无此用户信息" })
    }
    if (err) {
      res.send({ code: 0, msg: JSON.stringify(err) })
    }
  })
};

module.exports = {
  info
};