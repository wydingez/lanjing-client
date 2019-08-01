import request from '@/utils/request'

export const queryInfo = (data) => 
  request({
    url: '/user/query',
    methods: 'post',
    data
  })