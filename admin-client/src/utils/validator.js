export const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ //邮箱
export const mobilePhoneReg = /^[1][0-9]{10}$/ //手机号
export const regNull = /^\S+$/g //空格
export const pswReg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{8,16}$/ //密码
export const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!pswReg.test(value)) {
    callback(new Error('请输入8～16位字母、数字及特殊符号组合'))
  } else {
    callback()
  }
}

export const usernameValidator = [
  { required: true, message: '请输入用户名', trigger: 'change' },
  {
    min: 3,
    max: 15,
    message: '长度在 3 到 15 个字符',
    trigger: 'change'
  }
]
export const passwordValidator = [{ required: true, validator: validatePass, trigger: 'change' }]
export const loginPasswordValidator = [{ required: true, message: '请输入密码', trigger: 'change' }]
export const roleNameValidator = [
  { required: true, message: '请输入角色名', trigger: 'change' },
  {
    min: 3,
    max: 15,
    message: '长度在 3 到 15 个字符',
    trigger: 'change'
  }
]
export const captchaValidator = [
  { required: true, message: '请输入验证码', trigger: 'change' },
  {
    min: 4,
    max: 4,
    message: '长度在 4 个字符',
    trigger: 'change'
  }
]
// import { emailReg ,mobilePhoneReg,pswReg,regNull} from '@/utils/validator'
