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