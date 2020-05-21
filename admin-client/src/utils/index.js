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

// 数组交集
export const intersection = (arr1, arr2) => {
  return arr1.filter(v => arr2.includes(v.name))
}

// 动态菜单
export const filterMenu = (menuJson = [], roleArr = [], forMenu = true) => {
  let routers = deepCopy(menuJson)
  let roles = deepCopy(roleArr)
  let res = intersection(routers, roles)

  if (forMenu) {
    res = res.filter(ele => !ele.notMenu && !ele.out)
  }

  res.forEach(item => {
    if (item.children) {
      item.children = filterMenu(item.children, roleArr, forMenu)
    }
  })

  return res
}

// 动态路由
export const filterRoutes = (menuJson = [], menu = []) => {
  let routes = deepCopy(menuJson)
  let arr = []
  let layout = routes.find(ele => ele.type === 'layout')
  let redirect = routes.find(ele => ele.type === 'redirect')
  let notFound = routes.find(ele => ele.type === 'notFound')
  arr.unshift(redirect)
  layout.children = menu
  routes.forEach(item => {
    // if (item.out && !item.type === 'notFound') {
    if (item.out && item.type !== 'notFound') arr.push(item)
  })
  arr = arr.concat(layout)
  arr.push(notFound)
  return arr
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
