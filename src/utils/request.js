import axios from 'axios'
import {
  Message,
  Loading
} from 'element-ui'
import store from '@/store'
import {
  getToken,
  removeToken
} from '@/utils/auth'

// 全局设置
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// create an axios instance
const service = axios.create({
  baseURL: process.env.API_HOST, // api 的API_HOST
  timeout: 5000 // request timeout
})
service.load = ''
service.loadBool = true
// request interceptor
service.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 网络请求超过200ms，弹出加载中
  setTimeout(() => {
    service.loadBool && (service.load = Loading.service({
      fullscreen: true,
      background: 'rgba(235, 239, 243, 0.4)',
      text: 'Loading...'
    }))
  }, 200)

  if (store.getters.token) {
    config.headers['Authorization'] = getToken()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  function (response) {
    service.loadBool = false
    service.load && service.load.close()
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 3 * 1000
      })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        removeToken()
        Message({
          message: res.msg,
          type: 'error',
          duration: 3 * 1000
        })
      }
      return res
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    service.loadBool = false
    service.load && service.load.close()
    return Promise.reject(error)
  })

export default service
