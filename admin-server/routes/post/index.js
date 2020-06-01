/* 
用户模块
*/
const express = require('express')
const router = express.Router()
const add = require('./add.js').add
const page = require('./page.js').page
const view = require('./view.js').view

router.get('/', (req, res) => {
  res.send({ code: 200, msg: 'ok' })
})

router.post('/add', async (req, res) => {
  console.log(req.body)
  add(req, res)
})

router.post('/page', async (req, res) => {
  page(req, res)
})

router.post('/view', async (req, res) => {
  view(req, res)
})

module.exports = router
