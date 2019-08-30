import request from '@/utils/request'

export const doLogin = (data) =>
  request({
    url: '/login',
    method: 'post',
    data
  })

export const doLogout = () =>
  request({
    url: '/logout',
    method: 'get'
  })

export const doWxAuth = () => {
  request({
    url: '/wx/auth',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export const doWxLogin = (code) => {
  request({
    url: '/wx/login',
    method: 'get',
    params: {
      code
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}