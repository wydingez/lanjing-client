import axios from 'axios'
import notice from '_c/notice'
import store from '../store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10,
  withCredentials: true
})

service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.success) {
      return res
    } else {
      console.log('request error', res)
      notice.error({
        text: res.msg
      })
      if (res.code === '9999') {
        // 没有登录或者超时，自动消除登录的状态记录
        store.dispatch('doRemoveUserLogined')
      }
      return Promise.reject(new Error('请求失败'))
    }
  },
  error => {
    console.log('err: ' + error)
    if (error.message.includes('timeout')) {
      // 超时提示
      notice.error({
        text: '服务器请求超时！'
      })
    } else {
      notice.error({
        text: error.message
      })
    }
    return Promise.reject(error)
  }
)

export default service
