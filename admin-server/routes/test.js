var express = require('express');
var router = express.Router();
const RoleSchema = require('../db/models').RoleSchema

router.post('/', (req, res) => {

  RoleSchema.find((err, doc) => {
    if (err) {
      res.send({ code: 0, data: err })
      return
    }
    if (!doc.length) {
      res.send({ code: 0, msg: '未找到' })
      return
    }
    console.log(doc)
    res.send({ code: 200, data: doc })

  })


});

module.exports = router;
