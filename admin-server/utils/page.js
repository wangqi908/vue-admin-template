const ipWithPort = require('../utils/getIp.js').ipWithPort
/* 
设置模糊查询条件
data对象 查询参数
*/
const setQuery = data => {
  // 如果不传data或者为空 则不查询
  if (JSON.stringify(data) === '{}' || !data) return null
  let arr = []
  for (const key in data) {
    const element = data[key]
    arr.push({
      [key]: key === '_id' ? element + '' : new RegExp(element, 'i')
    })
  }
  let where = { $and: arr } //查询条件 $or或 $and与
  return where
}

/* 
查询总数
Model 集合的Model
data  查询参数
*/
const findCount = (Model, data) => {
  return new Promise((resolve, reject) => {
    //查询条件
    let where = setQuery(data)
    Model.countDocuments(where, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

// 设置过滤掉的熟悉
// let filterArr = ['createTime', 'updateTime', 'password', '__v']
const setFilter = filter => {
  let obj = {}
  filter.forEach(ele => {
    obj[ele] = 0
  })
  return obj
}

/* 
设置分页
Model 集合的Model
data  查询参数
pageData pageSize每页返回数量 pageNum页数
filterArr 设置过滤掉的熟悉 ['createTime', 'updateTime', 'password', '__v']
*/
const setPage = (Model, data, pageData, filterArr = [], needHttp) => {
  let filter = setFilter(filterArr)
  let { pageNum, pageSize } = pageData
  //查询条件
  let where = setQuery(data)
  return new Promise((resolve, reject) => {
    Model.find(where, filter, async (err, res) => {
      if (err) reject(err)
      const count = await findCount(Model, data)
      let list = JSON.parse(JSON.stringify(res))
      if (needHttp) {
        list.forEach(ele => {
          ele.http = ipWithPort
        })
      }
      let sendData = {
        count,
        list
      }
      resolve(sendData)
    })
      .skip(pageNum * pageSize)
      .limit(pageSize)
      .sort({ _id: -1 })
  })
}

module.exports = {
  findCount,
  setPage
}
