let express = require('express');
let multer = require('multer');//文件获取储存的第三方模块
const fs = require('fs');
let router = express.Router();
let upload = multer({ dest: 'public/files/' }).array('file', 10);

router.post('/', upload, function (req, res, next) {
  let files = req.files;
  if (files.length === 0) {
    res.render("error", { message: "上传文件不能为空！" });
    return
  } else {
    let fileInfos = [];
    for (let i in files) {
      let file = files[i];
      let tmp_path = file.path;
      console.log(file)
      let target_path = './public/files/' + file.originalname;
      fs.renameSync(tmp_path, target_path);//这里修改文件名。
      fileInfos.push(target_path)
    }
    res.send(fileInfos);
  }
});
module.exports = router;
