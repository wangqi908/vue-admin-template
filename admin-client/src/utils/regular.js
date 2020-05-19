export const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ //邮箱
export const mobilePhoneReg = /^[1][0-9]{10}$/ //手机号
export const regNull = /^\S+$/g //空格
export const pswReg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{8,16}$/ //密码

// import { emailReg ,mobilePhoneReg,pswReg,regNull} from '@/utils/regular'
