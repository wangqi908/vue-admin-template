var express = require('express');
var router = express.Router();
// 引入UserModel
const UserModel = require('../db/models').UserModel

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/info', (req, res, next) => {
  res.send({ code: 200, msg: 'info' });
});

module.exports = router;
