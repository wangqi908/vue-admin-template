const express = require('express');
const router = express.Router();
const ocrReq = require('../utils/bdOcr.js').ocrReq //调用百度文字识别接口

router.get('/', (req, res) => {
  res.send({ code: 200, data: { msg: 'ok' } })
});

// 文字识别 传入base64图片
router.post('/ocr', async (req, res) => {
  const { image } = req.body
  const ocrRes = await ocrReq(image)
  res.send({ code: 200, ocrRes })
});

module.exports = router;
