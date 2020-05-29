// 添加
const PostSchema = require('../../db/models').PostSchema

const add = (req, res) => {
  const { title, type, content } = req.body
  console.log(title, type, content)
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

  let Model = new PostSchema({ title, type, content })
  Model.save((err, doc) => {
    res.send({ code: 200, data: { msg: 'ok' } })
  })
}

module.exports = {
  add
}
