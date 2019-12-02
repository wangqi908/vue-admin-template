// 时间戳格式化
export const formatTime = (date, type) => {
  if (!date || date === '') return ''
  date = new Date(date * 1); //如果date为13位不需要乘1000

  const year = date.getFullYear()
  const month = (date.getMonth() + 1 < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1)
  const day = (date.getDate() < 10 ? ('0' + (date.getDate())) : date.getDate())
  const hours = (date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours())
  const minutes = (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes())
  const seconds = (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
  if (type === 'all') {
    let res = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
    return res
  } else if (type === 'YMD') {
    let res = `${year}/${month}/${day}`
    return res
  } else {
    return { year, month, day, hours, minutes, seconds };
  }
}

//数组对象根据id去重
export const duplicateRemoval = (property, id = "id") => {
  let hash = {};
  return (property = property.reduce((preVal, curVal) => {
    hash[curVal[id]] ?
      "" :
      (hash[curVal[id]] = true && preVal.push(curVal));
    return preVal;
  }, []));
}

/* 
根据数组内部相同的key来合并数组
arr 数组
key 分类的属性
*/
export const sameTypeToGrouping = (arr, key) => {
  let typeArr = [];
  let resArr = [];
  arr.forEach(ele => {
    typeArr.push(ele.type);
  });
  typeArr = typeArr.filter((item, index, typeArr) => {
    //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
    return typeArr.indexOf(item, 0) === index;
  });
  typeArr.forEach(element => {
    let pics = [];
    arr.forEach(ele => {
      if (ele[key] == element) {
        pics.push(ele);
      }
    });
    resArr.push({
      type: element,
      pics
    });
  });
  return resArr;
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
// export const jsonToExcel = (params) => {
//   let { list, header, keys, excelName } = params;
//   let formatJson = (keys, jsonData) => {
//     return jsonData.map(v => keys.map(j => v[j]));
//   }
//   require.ensure([], () => {
//     const { export_json_to_excel } = require("@/vendor/Export2Excel");
//     const data = formatJson(keys, list);
//     export_json_to_excel(header, data, excelName);
//   });
// }

// 重置对象里的键为空
export const elementReset = (searchData = {}) => {
  let type = o => {
    var s = Object.prototype.toString.call(o);
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
    /* 
    type({}); // "object"
    type([]); // "array"
    type(5); // "number"
    type(null); // "null"
    type(); // "undefined"
    type(/abcd/); // "regex"
    type(new Date()); // "date"
    */
  };
  for (const key in searchData) {
    const element = searchData[key];
    let elementType = type(element);
    if (elementType === "object") {
      searchData[key] = {};
    } else if (elementType === "array") {
      searchData[key] = [];
    } else if (elementType === "null") {
      searchData[key] = null;
    } else {
      searchData[key] = "";
    }
  }
  return searchData
}
