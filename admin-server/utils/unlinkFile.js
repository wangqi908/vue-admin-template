// 删除文件
const fs = require('fs');
const path = require("path");
// 返回的路径
const unlinkFile = filePath => {

  return new Promise((resolve, reject) => {
    if (!filePath) {
      resolve('无文件地址')
      return
    }
    filePath = path.resolve('./public/', filePath)
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve('成功')
    })
  })
}

module.exports = {
  unlinkFile
};
