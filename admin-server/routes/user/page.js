// 分页
const UserModel = require('../../db/models').UserModel
const setPage = require('../../utils/page.js').setPage
const page = async (req, res) => { // 查找群详细信息
  const { pageNum, pageSize, data } = req.body

  try {
    let pageData = {
      pageNum, pageSize
    }
    let filterArr = ['password', '__v']
    // 分页
    const pageRes = await setPage(UserModel, data, pageData, filterArr, ipWithPort = true)
    res.send({ code: 200, data: pageRes });
  } catch (err) {
    res.send({ code: 0, err });
  }
};

module.exports = {
  page
};