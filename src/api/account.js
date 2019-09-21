import request from '@/utils/request'

export const getFundList = (data) => 
  request({
    url: '/acct/fund/list',
    method: 'post',
    data
  })

/** 绑定初始支付密码 */
export const doBindPayPassword = (password) =>
  request({
    url: `/acct/set-pwd/${password}`,
    method: 'post'
  })

/** 修改支付密码 */
export const doUpdatePayPassword = (data) =>
  request({
    url: `/acct/reset-pwd`,
    method: 'post',
    data
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

export const doResetPassword = (data) => {
  request({
    url: '/xx/yyy',
    method: 'post',
    data
  })
} 