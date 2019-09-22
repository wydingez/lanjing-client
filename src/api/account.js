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
export const doCashOut = (data) => 
  request({
    url: `/acct/withdraw`,
    method: 'post',
    data
  })

/** 激活邮箱 */
export const doActivateEmail = (data) =>
  request({
    url: '/email/active/mail',
    method: 'post',
    data
  })

/** 获取登录密码验证码接口 */
export const getLoginPassValidCode = ()=>
  request({
    url: `/email/login-pwd/code`,
    method: 'get'
  })

/** 获取登录密码验证码接口 */
export const getPayPassValidCode = () =>
  request({
    url: `/email/pay-pwd/code`,
    method: 'get'
  })

/** 通过邮箱验证码重设支付密码 */
export const doResetPayPwdByEmail = (data) =>
  request({
    url: '/acct/forget-rest-pwd',
    method: 'post',
    data
  })