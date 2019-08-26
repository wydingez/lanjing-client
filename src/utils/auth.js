import Cookies from 'js-cookie'

const LoginedKey = 'logined'
const LoginInfoKey = 'loginUserInfo'

export function getLogined() {
  return Cookies.get(LoginedKey)
}

export function setLogined(value) {
  return Cookies.set(LoginedKey, value)
}

export function removeLogined() {
  return Cookies.remove(LoginedKey)
}

export function getLoginInfoKey() {
  return Cookies.get(LoginInfoKey)
}

export function setLoginInfoKey(value) {
  return Cookies.set(LoginInfoKey, value)
}

export function removeLoginInfoKey() {
  return Cookies.remove(LoginInfoKey)
}

export function getAvatarUrl() {
  let loginUserInfo = getLoginInfoKey()
  return loginUserInfo && loginUserInfo.portraitPicUrl
}