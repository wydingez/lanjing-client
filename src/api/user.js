import request from '@/utils/request'

export const queryInfo = () => 
  request({
    url: '/user/query',
    method: 'get'
  })

export const bindInfo = (data) =>
  request({
    url: '/user/bind-info',
    method: 'post',
    data
  })

export const doUserRegister = (data) =>
  request({
    url: '/user/register',
    method: 'post',
    data
  })

export const doRealnameAuth = (data) =>
  request({
    url: '/user/realName-verify',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })