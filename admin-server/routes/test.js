var express = require('express');
var router = express.Router();
const tokenTool = require('../utils/token.js')

/* GET home page. */
router.post('/', (req, res) => {
  let { token } = req.body
  let tokenRes = tokenTool.verifyToken(token)
  if (tokenRes !== "Token Invalid") {
    res.send({ code: 200, data: { msg: 'ok' } })
  } else {
    res.send({ code: 0, data: { msg: 'Token Invalid' } })
  }
});

module.exports = router;
