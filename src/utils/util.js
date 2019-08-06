export function formatMoney (str = '') {
  str = String(str)
  return str.replace(/[0-9]+?(?=(?:([0-9]{3}))+$)/g,function(a){return a+','})
}

export function formatFormData (obj = {}) {
  let formData = new FormData()
  Object.keys(obj).forEach(key => {
    formData.append(key, obj[key])
  })
  return formData
}

export const REGEX = {
  phone: /^1[3456789]\d{9}$/,
  email: /.+@.+/,
  password: /^[\w_-]{6,16}$/
}