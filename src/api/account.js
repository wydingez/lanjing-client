import request from '@/utils/request'

export const getFundList = (data) => 
  request({
    url: '/acct/fund/list',
    methods: 'post',
    data
  })