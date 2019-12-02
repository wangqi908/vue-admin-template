/* 
注册模块
*/
const express = require('express');
const router = express.Router();

const add = require('./user/add.js').add

router.post('/', (req, res) => {
  add(req, res)
});

module.exports = router;
