const express = require('express')
const svgCaptcha = require('svg-captcha')
const router = express.Router()
// https://www.npmjs.com/package/svg-captcha

router.get('/', (req, res, next) => {
  const captcha = svgCaptcha.create({
    width: 90,
    height: 35,
    ignoreChars: false,
    color: true
  })
  req.session.captchaValue = captcha.text.toLowerCase()

  res.send({ code: 200, data: captcha.data })
})

module.exports = router
