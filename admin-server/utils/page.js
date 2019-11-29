
/* 
设置模糊查询条件
data对象 查询参数
*/
const setQuery = (data) => {
  let arr = []
  for (const key in data) {
    const element = data[key];
    arr.push({
      [key]: key === "_id" ? element + '' : new RegExp(element, 'i')
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

/* 
设置分页
Model 集合的Model
data  查询参数
pageData pageSize每页返回数量 pageNum页数
*/
const setPage = (Model, data, pageData) => {
  let { pageNum, pageSize } = pageData

  //查询条件
  let where = setQuery(data)

  return new Promise((resolve, reject) => {
    Model.find(where, (userErr, userList) => {
      if (userErr) reject(userErr)
      resolve(userList)
    }).skip(pageNum * pageSize).limit(pageSize)
  })
}

exports.findCount = findCount;
exports.setPage = setPage;