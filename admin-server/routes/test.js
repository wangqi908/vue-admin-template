var express = require('express');
var router = express.Router();
const tokenTool = require('../utils/token.js')

/* GET home page. */
router.post('/', (req, res) => {

  res.send({ code: 200, data: { msg: 'ok' } })
 
});

module.exports = router;
