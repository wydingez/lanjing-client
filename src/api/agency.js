import request from '@/utils/request'

export const doAgencyBuy = (data) =>
  request({
    url: '/agency/buy',
    method: 'post',
    data
  })

export const doAgencySale = (data) =>
  request({
    url: '/agency/sale',
    method: 'post',
    data
  })

export const getAgencyTop5 = () =>
  request({
    url: '/agency/top5',
    method: 'get'
  })

export const getAgencyDetail = (agencyNo) => {
  request({
    url: `/agency/relate-trade/${agencyNo}`,
    method: 'post'
  })
}