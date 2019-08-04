import axios from 'axios'
import notice from '_c/notice'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
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
      return Promise.reject(new Error('请求失败'))
    }
  },
  error => {
    console.log('err' + error)
    notice.error({
      text: error.message
    })
    return Promise.reject(error)
  }
)

export default service
