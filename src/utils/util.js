export function formatMoney (str = '') {
  str = String(str)
  return str.replace(/[0-9]+?(?=(?:([0-9]{3}))+$)/g,function(a){return a+','})
}

export function formatFormData (obj = {}) {
  let formData = new FormData()
  Object.keys(obj).forEach(key => {
    if (obj[key] instanceof Blob) {
      formData.append(key, obj[key], obj[key].name)
    } else {
      formData.append(key, obj[key])
    }
  })
  return formData
}

export const REGEX = {
  phone: /^1[3456789]\d{9}$/,
  email: /.+@.+/,
  // 至少一个大写字母，一个小写字母，一个数字的不小于6位的密码组合
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}/
}