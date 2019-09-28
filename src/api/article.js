import request from '@/utils/request'

export const getArticleInfo = (key) =>
  request({
    url: `/article/query/${key}`,
    method: 'get'
  })

export const getArticleContent = (data) =>
 request({
   url: '/article/query',
   method: 'post',
   data
 })