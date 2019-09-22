import request from '@/utils/request'

export const getArticleInfo = (key) =>
  request({
    url: `/article/query/${key}`,
    method: 'get'
  })