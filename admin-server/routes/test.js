var express = require('express');
var router = express.Router();
const unlinkFile = require('../utils/unlinkFile').unlinkFile

/* GET home page. */
router.post('/', async (req, res) => {

  let { filePath } = req.body

  const aa = await unlinkFile(filePath)
  console.log(aa)

  res.send({ code: 200, data: { msg: 'ok' } })

});

module.exports = router;
