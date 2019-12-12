// 保存数据时如果有图片则永久保存
const fs = require('fs');
const path = require("path");
// 返回的路径
const remove = avatar => {

  return new Promise((resolve, reject) => {
    if (!avatar) resolve('')
    let name = avatar.split("/")[1]
    let oldPath = path.resolve('./public/temp_files/', name)
    let newPath = path.resolve('./public/files/', name)

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        reject(err)
        return
      }
      let targetPath = 'files/' + name
      resolve(targetPath)
    })
  })
}

module.exports = {
  remove
};
