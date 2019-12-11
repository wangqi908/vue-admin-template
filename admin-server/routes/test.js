var express = require('express');
var router = express.Router();
const PermissionSchema = require('../db/models').PermissionSchema

router.post('/', (req, res) => {

  PermissionSchema.find((err, doc) => {
    if (err) {
      res.send({ code: 0, data: err })
      return
    }
    if (!doc.length) {
      res.send({ code: 0, msg: '未找到' })
      return
    }
    res.send({ code: 200, data: doc })

  }).sort({index:1})


});

module.exports = router;
