var express = require('express');
var router = express.Router();
const tokenTool = require('../utils/token.js')
let ipWithPort = require('../utils/getIp.js').ipWithPort
const UserModel = require('../db/models').UserModel
const filter = { password: 0, __v: 0 } // 查询时过滤出指定的属性

router.get('/info', (req, res, next) => {
  let { authorization } = req.headers
  let verifyToken = tokenTool.verifyToken(authorization)
  let { _id, username } = verifyToken
  UserModel.findOne({ _id, username }, filter, (err, user) => {
    if (user) {
      let obj = JSON.parse(JSON.stringify(user))
      obj.http = ipWithPort
      res.send({ code: 200, obj });
    } else {
      res.send({ code: 200, msg: "无此用户信息" });
    }
    if (err) {
      res.send({ code: 0, msg: JSON.stringify(err) });
    }
  })
});

module.exports = router;
