import axios from 'axios'
import notice from '_c/notice'
import store from '../store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 8000,
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
    notice.error({
      text: error.message
    })
    return Promise.reject(error)
  }
)

export default service
