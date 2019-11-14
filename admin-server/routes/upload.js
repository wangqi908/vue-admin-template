var express = require('express');
var multer = require('multer');//文件获取储存的第三方模块
const fs = require('fs');
var router = express.Router();
var upload = multer({ dest: './files_temp' });

router.post('/', upload.single('file'), function (req, res, next) {
  var tmp_path = req.file.path;
  var target_path = './public/files/' + req.file.originalname;
  fs.rename(tmp_path, target_path, function (err) {
    if (err) throw err;
    // 删除临时文件夹文件, 
    fs.unlink(tmp_path, function () {
      if (err) throw err;
      res.send('File uploaded to: ' + target_path + ' - ' + req.file.size + ' bytes');
    });
  });
});
module.exports = router;
