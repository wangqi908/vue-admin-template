import store from '@/store'
const propList = store.state.propList || []
//  工程类别
export const getProjectTypeArr = () => {
  let projectTypeArr = propList.filter(ele => ele.propKey === 'projectType')
  return projectTypeArr
}

//  检测类别
export const getCheckTypeArr = () => {
  let checkTypeArr = propList.filter(ele => ele.propKey === 'testingType')
  return checkTypeArr
}

//  公司类型
export const getCompanyTypeArr = () => {
  let companyTypeArr = propList.filter(ele => ele.propKey === 'companyType')
  return companyTypeArr
}

//  记录类型
export const getRecordTypeArr = () => {
  let recordTypeArr = propList.filter(ele => ele.propKey === 'recordType')
  return recordTypeArr
}

//  出库事由
export const getOutReasonArr = () => {
  let OutReasonArr = propList.filter(ele => ele.propKey === '出库事由')
  return OutReasonArr
}

//  过滤工程类别名称
export const projectTypeDict = val => {
  let projectType = getProjectTypeArr().find(ele => ele.id === val * 1)
  return projectType ? projectType.propDesc : '暂无'
}

//  过滤检测项目名称
export const checkTypeDict = val => {
  let checkType = getCheckTypeArr().find(ele => ele.id === val * 1)
  return checkType ? checkType.propDesc : '暂无'
}

//  过滤单位类型名称
export const companyTypeDict = val => {
  let checkType = getCompanyTypeArr().find(ele => ele.propValue == val)
  return checkType ? checkType.propDesc : '暂无'
}

// 记录类型名称
export const recordTypeDict = val => {
  let checkType = getRecordTypeArr().find(ele => ele.propValue == val)
  return checkType ? checkType.propDesc : '暂无'
}

//  产品类型名称
// 0：配件；1：设备；9：服务
export const productTypeArr = [
  { id: 0, name: '配件' },
  { id: 1, name: '设备' },
  { id: 9, name: '服务' }
]

// 产品类型名称
export const productTypeDict = val => {
  let checkType = productTypeArr.find(ele => ele.id == val)
  return checkType ? checkType.name : '暂无'
}

//  page状态
export const pageStatusArr = [
  { id: 1, name: '在用' },
  { id: 0, name: '禁用' }
]

// page状态
export const pageStatusDict = val => {
  let checkType = pageStatusArr.find(ele => ele.id == val)
  return checkType ? checkType.name : '暂无'
}

// 设备状态 0：在库 1：在用 -1：报废
export const eqStatusArr = [
  { id: 0, name: '在库' },
  { id: 1, name: '在用' },
  { id: -1, name: '报废' }
]

// 设备状态
export const eqStatusDict = val => {
  let checkType = eqStatusArr.find(ele => ele.id == val)
  return checkType ? checkType.name : '暂无'
}

//判断支付方式
export const formatPayMethod = cellValue => {
  switch (cellValue) {
    case 0:
      return '免单'
    case 1:
      return '在线支付'
    case 2:
      return '年结'
    case 4:
      return '对公转账'
    case 5:
      return '现金'
    case 6:
      return '支票'
    case 7:
      return '零元付'
  }
}

/* 
判断是否是正确时间格式
设备保修期判断：到订单信息页，系统检测设备编号前4位，例180302003，前四位代表出厂年月
*/
export const isCorrectTimeFormat = equipmentCode => {
  equipmentCode = equipmentCode + ''
  if (equipmentCode.length >= 6) {
    equipmentCode = equipmentCode.substr(0, 6)
  }
  let yy = equipmentCode.substr(0, 2)
  let mm = equipmentCode.substr(2, 2)
  let dd = equipmentCode.substr(4, 2)

  let equipmentTimestamp = +new Date('20' + (yy * 1 + 1) + '-' + mm + '-' + dd)
  if (equipmentCode.length < 6) {
    return false
  } else if (isNaN(equipmentTimestamp)) {
    return false
  } else {
    return true
  }
}

// 开工单状态
export const workOrderState = data => {
  /* 
  0.待立项
  1.待受理
  2.已受理
  */
  let state = ''
  switch (data) {
    case 0:
      state = '待立项'
      break
    case 1:
      state = '待受理'
      break
    case 2:
      state = '已受理'
      break
    default:
      state = '其他'
      break
  }
  return state
}

//  审核状态
export const workOrderAuditState = data => {
  /* 
  0.以保存 
  1.审核中 
  3.通过 
  5.驳回
  */
  let state = ''
  switch (data) {
    case 0:
      state = '已保存'
      break
    case 1:
      state = '审核中'
      break
    case 3:
      state = '通过'
      break
    case 5:
      state = '驳回'
      break
    default:
      state = '其他'
      break
  }
  return state
}

//  工程状态
export const projectAuditStatus = data => {
  /* 
  10 : 受理
  13 : 指派
  15 : 准备
  30 : 待施工
  33 : 施工中
  71 : 完成
  73 : 终止
  */
  let state = ''
  switch (data) {
    case 10:
      state = '受理'
      break
    case 13:
      state = '指派'
      break
    case 15:
      state = '准备'
      break
    case 30:
      state = '待施工'
      break
    case 33:
      state = '施工中'
      break
    case 71:
      state = '完成'
      break
    case 73:
      state = '终止'
      break
    default:
      state = '其他'
      break
  }
  return state
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
