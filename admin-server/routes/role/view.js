// 详情
const getRoleInfo = require('../../utils').getRoleInfo

const view = async (req, res) => {
  let { _id } = req.body
  try {
    const data = await getRoleInfo(_id)
    res.send({ code: 200, data })
  } catch (error) {
    res.send({ code: 0, data: error })
  }
};

module.exports = {
  view
};
