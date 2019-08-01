import request from '@/utils/request'

export const doLogin = (data) =>
  request({
    url: '/login',
    method: 'post',
    data
  })