/* 
用户模块
*/
const express = require('express')
const router = express.Router()
const list = require('./list.js').list

router.get('/', (req, res) => {
  res.send({ code: 200, msg: 'ok' })
})

router.post('/prop/list', async (req, res) => {
  list(req, res)
})

module.exports = router
