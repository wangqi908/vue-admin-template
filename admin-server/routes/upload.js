var express = require('express');
var multer = require('multer');//文件获取储存的第三方模块
const fs = require('fs');
var router = express.Router();
var upload = multer({ dest: 'public/files/' }).array('file', 10);

router.post('/', upload, function (req, res, next) {
  let files = req.files;
  if (files.length === 0) {
    res.render("error", { message: "上传文件不能为空！" });
    return
  } else {
    let fileInfos = [];
    for (var i in files) {
      let file = files[i];
      var tmp_path = file.path;
      var target_path = './public/files/' + file.originalname;
      fs.renameSync(tmp_path, target_path);//这里修改文件名。
      fileInfos.push(target_path)
    }
    res.send(fileInfos);
  }
});
module.exports = router;
