import request from '@/utils/request'

export const queryInfo = () => 
  request({
    url: '/user/query',
    method: 'get'
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
    },
    timeout: 200000
  })

/** 绑定银行卡号 */
export const doBindBankcard = (bankcard) =>
  request({
    url: `/user/bind/bankcard/${bankcard}`,
    method: 'post'
  })

/** 绑定邮箱 */
export const doBindEmail = (email) =>
  request({
    url: `/user/bind/email/${email}`,
    method: 'post'
  })

/** 绑定手机号 */
export const doBindPhone = (phone) =>
  request({
    url: `/user/bind/phone/${phone}`,
    method: 'post'
  })

/** 绑定支付宝 */
export const doBindZfb = (zfb) =>
  request({
    url: `/user/bind/zfb/${zfb}`,
    method: 'post'
  })

/** 绑定银行卡号 */
export const doBindBankCard = (bankcard) =>
  request({
    url: `/user/bind/bankCard/${bankcard}`,
    method: 'post'
  })

export const doResetLoginPassword = (data) =>
  request({
    url: '/user/rest-pwd',
    method: "post",
    data
  })

export const doFirstSetLoginPassword = (pwd) =>
  request({
    url: `/user/set-pwd/${pwd}`,
    method: 'post'
  })
