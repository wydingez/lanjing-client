import request from '@/utils/request'

export const doTradeBuy = (data) =>
  request({
    url: '/trade/buy',
    method: 'post',
    data
  })

export const doTradeSale = (data) =>
  request({
    url: '/trade/sale',
    method: 'post',
    data
  })

export const doDeliveryConfirm = (tradeNo) =>
  request({
    url: `/trade/deliver-confirm/${tradeNo}`,
    method: 'post'
  })

export const doReceiveConfirm = (tradeNo) =>
  request({
    url: `/trade/take-confirm/${tradeNo}`,
    method: 'post'
  })

export const queryDailyTrade = () =>
  request({
    url: '/statistic/trade',
    method: 'get'
  })