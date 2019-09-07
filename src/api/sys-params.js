import request from '@/utils/request'

export const getAmountLimit = () =>
  request({
    url: `/sys-params/query/amount-limit`,
    method: 'get'
  })

export const getPriceLimit = () =>
  request({
    url: `/sys-params/query/price-limit`,
    method: 'get'
  })

export const getTradeRate = () =>
  request({
    url: '/sys-params/query/trade-rate',
    method: 'get'
  })