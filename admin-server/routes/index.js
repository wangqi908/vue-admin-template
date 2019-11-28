const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send({ code: 200, title: 'Express', msg: "ok" });
});

module.exports = router;
