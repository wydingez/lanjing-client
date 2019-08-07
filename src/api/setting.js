import request from '@/utils/request'

/**
 * 设置消息提醒
 * @param {String} type : acctChange / agency / trade
 * @param {Boolean} flag : true / false
 */
export const doChangeNotify = (type, flag) =>
  request({
    url: `/setting/${type}/notify/${flag}`,
    method: 'post'
  })
