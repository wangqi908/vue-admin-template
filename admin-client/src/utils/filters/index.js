import { formatTime } from '@/utils'
import {
  productTypeDict,
  eqStatusDict,
  companyTypeDict,
  formatRepairStatus,
  formatOrderStatus,
  formatPayMethod,
  formatReturnStatus
} from '@/utils/dict.js'

const filters = {
  HMSTimeFilter(val) {
    return formatTime(val, 'HMS')
  },
  YMDTimeFilter(val) {
    return formatTime(val, 'YMD')
  },
  allTimeFilter(val) {
    return formatTime(val, 'all')
  },
  // 产品类型
  filterProductType(val) {
    return productTypeDict(val)
  },
  // 产品状态
  filterEqStatus(val) {
    return eqStatusDict(val)
  },
  // 过滤单位类型名称
  filterCompanyType(val) {
    return companyTypeDict(val)
  },
  // 报修单状态
  filterRepairStatus(val) {
    return formatRepairStatus(val)
  },
  // 订单状态
  filterOrderStatus(val) {
    return formatOrderStatus(val)
  },
  // 返厂单状态
  filterReturnStatus(val) {
    return formatReturnStatus(val)
  },
  // 支付方式
  filterPayMethod(val) {
    return formatPayMethod(val)
  },
  // 售价
  filterPrice(val) {
    return val ? val / 100 : '暂无'
  }
}

export default Vue => {
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}
