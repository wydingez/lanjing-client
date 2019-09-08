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

/**
 * 查询即时订单详情
 * @param {String} tradeNo 订单编号
 */
export const getTradeDetail = (tradeNo) =>
  request({
    url: `/trade/detail/${tradeNo}`,
    method: 'get'
  })

/**
 * 即时订单取消
 * @param {String} tradeNo 订单编号
 */
export const doTradeCancel = (tradeNo) =>
  request({
    url: `/trade/cancel/${tradeNo}`,
    method: 'post'
  })

/**
 * 委托订单取消
 * @param {String} agencyNo 委托单号
 */
export const doAgencyCancel = (agencyNo) =>
  request({
    url: `/agency/cancel/${agencyNo}`,
    method: 'post'
  })