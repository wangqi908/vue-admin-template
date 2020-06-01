// 添加
const PostSchema = require('../../db/models').PostSchema
const remove = require('../../utils/remove').remove //保存到永久文件夹

const add = async (req, res) => {
  const { title, type, content, intro, banner } = req.body
  if (!title) {
    res.send({ code: 0, msg: '请输入文章名称' })
    return
  }
  if (!type) {
    res.send({ code: 0, msg: '请选择类型' })
    return
  }
  if (!content) {
    res.send({ code: 0, msg: '请输入文章内容' })
    return
  }
  const newBannerPath = await remove(banner) //头像新路径
  let Model = new PostSchema({ title, type, content, banner: newBannerPath, intro })
  Model.save((err, doc) => {
    res.send({ code: 200, data: { msg: 'ok' } })
  })
}

module.exports = {
  add
}
