// 时间戳格式化
export const formatTime = (date, type) => {
  if (!date || date === '') return ''
  date = new Date(date * 1) //如果date为13位不需要乘1000

  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  if (type === 'all') {
    let res = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
    return res
  } else if (type === 'YMD') {
    let res = `${year}/${month}/${day}`
    return res
  } else if (type === 'HMS') {
    let res = `${hours}:${minutes}:${seconds}`
    return res
  } else {
    return { year, month, day, hours, minutes, seconds }
  }
}

// 复制到粘贴板
export const copyToClipboard = val => {
  return new Promise((resolve, reject) => {
    let input = document.createElement('input')
    input.value = val
    document.body.appendChild(input)
    input.select() // 选择对象;
    let res = document.execCommand('Copy') // 执行浏览器复制命令
    if (res) resolve(res)
    else reject(res)
    input.remove()
  })
}

// 权限过滤动态生成菜单
export const filterMenu = (authRoutes = [], roles = []) => {
  let list = deepCopy(authRoutes)
  let arr = []
  list.forEach(ele => {
    if (ele.children && ele.children.length > 0) ele.children = filterMenu(ele.children, roles)
    roles.forEach(name => {
      if (ele.name === name && !ele.out && !ele.notMenu) {
        arr.push(ele)
      }
    })
  })
  return arr
}

// 权限过滤动态生成路由
export const filterRoutes = (menuJson = []) => {
  let list = deepCopy(menuJson)
  let arr = []
  list.forEach(ele => {
    if (ele.out) arr.push(ele)
  })
  let layout = list.find(ele => ele.type === 'layout')
  let children = list.filter(ele => !ele.out && !ele.type)
  layout.children = flatArr(children)
  arr = arr.concat(layout)

  return arr
}

export const flatArr = children => {
  let list = []
  const fn = children => {
    children.forEach(ele => {
      if (ele.children) {
        fn(ele.children)
      } else {
        list.push(ele)
      }
    })
    return list
  }
  return fn(children)
}

// 防抖
export const debounce = (fn, wait) => {
  let timeout = null
  return () => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(fn, wait)
  }
}

// 节流
export const throttle = (fn, wait) => {
  let prov = Date.now()
  return () => {
    let now = Date.now()
    if (now - prov > wait) {
      fn()
      prov = Date.now()
    }
  }
}

// 深拷贝
export const deepCopy = obj => {
  const target = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    const element = obj[key]
    target[key] = typeof element === 'object' ? deepCopy(element) : element
  }
  return target
}

// 数组对象根据id去重
export const uniqueArr = (arr, id = 'id') => {
  if (arr.length === 0) return []
  return arr.reduce((prev, cur) => {
    let hasId = prev.some(ele => ele[id] === cur[id])
    return hasId ? prev : [...prev, cur]
  }, [])
}

/* 
生成excel工具
参数params对象属性list, header, keys, excelName
list 数组 [{k:v},{k:v}]
header excel第一行名称
keys 属性,键
excelName 生成的excel文件名称
实例:
let list =  [
  {
    name: "韩版设计时尚风衣大",
    number: "MPM00112",
    salePrice: "￥999.00",
    stockNum: 3423,
  },
  {
    name: "韩版设计时尚风衣大11",
    number: "MPM00112",
    salePrice: "￥999.00",
    stockNum: 3423,
  }
]
const header = ["商品名称", "商品货号", "售价", "库存"];
const keys = [
  "name",
  "number",
  "salePrice",
  "stockNum",
];
const excelName = "商品管理列表";
let params = {
  list,
  header,
  keys,
  excelName
};
jsonToExcel(params);
*/
export const jsonToExcel = params => {
  let { list, header, keys, excelName } = params
  let formatJson = (keys, jsonData) => {
    return jsonData.map(v => keys.map(j => v[j]))
  }

  import('@/vendor/Export2Excel.js').then(excel => {
    if (list) {
      const data = formatJson(keys, list)
      excel.export_json_to_excel({
        // 调用excel方法生成表格
        header,
        data,
        filename: excelName
      })
    } else {
      alert('暂无无数据')
    }
  })
}

export const formatTimestamp = date => {
  if (date === undefined || date === '' || date === 'undefined') {
    return ''
  }
  date = new Date(date * 1) //如果date为13位不需要乘1000
  if (date == 'Invalid Date') {
    return '时间格式有误'
  }
  var year = date.getFullYear()
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

  return { year, month, day, hours, minutes, seconds }
}

// 转换时间戳
export const getTimestamp = (year, month, day) => {
  return +new Date(year, month, day)
}

export const formatAllTimestamp = date => {
  var res = new Date(date).toLocaleDateString().replace(/\//g, '.') + ' ' + new Date(date).toTimeString().substr(0, 5)
  return res
}

// 获取年月日
export const getYearMonthDay = date => {
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  let weekDay = date.getDay()
  return { year, month, day, weekDay }
}

// 数组内的对象排序
export const compare = property => {
  return function(a, b) {
    var value1 = a[property]
    var value2 = b[property]
    return value1 - value2
  }
}

//数组对象根据id去重
export const duplicateRemoval = (property, id = 'id') => {
  let hash = {}
  return (property = property.reduce((preVal, curVal) => {
    hash[curVal[id]] ? '' : (hash[curVal[id]] = true && preVal.push(curVal))
    return preVal
  }, []))
}

//判断报修单状态
export const formatRepairStatus = cellValue => {
  switch (cellValue) {
    case 10:
      return '待处理'
    case 30:
      return '已受理'
    case 31:
      return '交互中'
    case 32:
      return '待支付'
    case 33:
      return '已支付'
    case 34:
      return '返厂'
    case 51:
      return '已关闭'
    case 52:
      return '退款关闭'
    case 53:
      return '不受理关闭'
    case 54:
      return '返厂'
    case 59:
      return '已完成'
  }
}

//判断返厂单状态
export const formatReturnStatus = cellValue => {
  switch (cellValue) {
    case 10:
      return '待处理'
    case 31:
      return '交互中'
    case 32:
      return '待支付'
    case 33:
      return '已支付'
    case 59:
      return '已完成'
  }
}

//判断订单状态
export const formatOrderStatus = cellValue => {
  switch (cellValue) {
    case 10:
      return '免单审核驳回'
    case 11:
      return '免单待审核'
    case 12:
      return '待用户确认'
    case 13:
      return '待用户支付'
    case 30:
      return '已支付'
    case 50:
      return '取消订单'
    case 51:
      return '超时未支付'
    case 52:
      return '异常关单'
    case 53:
      return '免单驳回'
    case 54:
      return '退款关单'
    case 59:
      return '完成'
  }
}

export const handleLogs = logs => {
  let subStatusArr = []
  logs.forEach((ele, index) => {
    subStatusArr.push({
      status: ele.subStatus,
      id: index,
      title: formatRepairStatus(ele.subStatus),
      description: formatAllTimestamp(ele.createTime)
    })
  })
  return subStatusArr
}

// 重置对象里的键为空
export const searchReset = (searchData = {}) => {
  let type = o => {
    var s = Object.prototype.toString.call(o)
    return s.match(/\[object (.*?)\]/)[1].toLowerCase()
    /* 
    type({}); // "object"
    type([]); // "array"
    type(5); // "number"
    type(null); // "null"
    type(); // "undefined"
    type(/abcd/); // "regex"
    type(new Date()); // "date"
    */
  }
  for (const key in searchData) {
    const element = searchData[key]
    let elementType = type(element)
    if (elementType === 'object') {
      searchData[key] = {}
    } else if (elementType === 'array') {
      searchData[key] = []
    } else if (elementType === 'null') {
      searchData[key] = null
    } else {
      searchData[key] = ''
    }
  }
  return searchData
}
