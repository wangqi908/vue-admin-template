let express = require('express');
let multer = require('multer');//文件获取储存的第三方模块
const fs = require('fs');
let router = express.Router();
let upload = multer({ dest: 'public/files/' }).array('file', 10);

router.post('/', upload, function (req, res, next) {
  let files = req.files;
  if (files.length === 0) {
    res.send({ code: 0, msg: "上传文件不能为空！" });
    return
  } else {
    let fileInfos = [];
    for (let i in files) {
      let file = files[i];
      let tmpPath = file.path;
      let types = file.originalname.split('.')
      let suffix = types[types.length - 1]
      let fileName = new Date().getTime() + i + '.' + suffix
      let filesPath = 'files/' + fileName;
      let public = 'public/'
      let targetPath = public + filesPath
      fs.renameSync(tmpPath, targetPath);//这里修改文件名。
      fileInfos.push(filesPath)
    }
    res.send(fileInfos);
  }
});
module.exports = router;
