const express = require('express')
const router = express.Router()
const PermissionSchema = require('../db/models').PermissionSchema
const filterArray = require('../utils').filterArray

router.get('/list', (req, res) => {
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
  }).sort({ index: 1 })
})

router.get('/tree', (req, res) => {
  PermissionSchema.find((err, doc) => {
    if (err) {
      res.send({ code: 0, data: err })
      return
    }
    if (!doc.length) {
      res.send({ code: 0, msg: '未找到' })
      return
    }

    let data = JSON.parse(JSON.stringify(doc))
    res.send({ code: 200, data: filterArray(data) })
  }).sort({ index: 1 })
})

module.exports = router
