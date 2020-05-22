/* 
注册模块
*/
const express = require('express')
const router = express.Router()

const add = require('./user/add.js').add

router.post('/', (req, res) => {
  const { captcha } = req.body
  if (!captcha) {
    res.send({ code: 0, msg: '请输入验证码' })
    return
  }

  if (captcha.toLowerCase() !== req.session.captchaValue) {
    res.send({ code: 0, msg: '验证码有误' })
    return
  }
  add(req, res)
})

module.exports = router
