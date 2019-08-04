import request from '@/utils/request'

export const doAgencyBuy = (data) =>
  request({
    url: '/agency/budy',
    method: 'post',
    data
  })

  export const getAgencyTop5 = () =>
    request({
      url: '/agency/top5',
      method: 'get'
    })