import request from '@/utils/request'

export const getFundList = (data) => 
  request({
    url: '/acct/fund/list',
    method: 'post',
    data
  })

export const doBindPayPassword = (password) =>
  request({
    url: `/acct/set-pwd/${password}`,
    method: 'post'
  })

/** 会员充值 */
export const doCashIn = (cash) => 
  request({
    url: `/acct/recharge/${cash}`,
    method: 'post'
  })

/** 会员提现 */
export const doCashOut = (cash) => 
  request({
    url: `/acct/withdraw/${cash}`,
    method: 'post'
  })