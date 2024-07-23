import axios from 'axios'
import { getToken } from './token'
import { Notify, showNotify } from 'vant'
import 'vant/es/notify/style'
import router from '@/router'
import { removeToken } from './token'

const BASE_URL = '/api'

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
})

request.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    config.headers['token'] = getToken()
    return config
  },
  (error) => {
    console.log(error)
  }
)

request.interceptors.response.use(
  (response) => {
    let res = response.data
    if (res.code === 0) {
      return response.data
    } else if (res.code === 40100) {
      // 40100 如果未登录跳转到登录页面
      showNotify({ type: 'danger', message: res.message })
      removeToken()
      router.push('login')
    } else if (
      res.code === 40000 ||
      res.code === 40101 ||
      res.code === 40400 ||
      res.code === 50000 ||
      res.code === 50001
    ) {
      showNotify({ type: 'danger', message: res.message })
      return Promise.reject(new Error(res.message))
    } else {
      return response.data
    }
  },
  (error) => {
    // 失败回调 处理http网络错误
    let message = '未知错误'
    if (error.code === 'ECONNABORTED' || error.code === 'Network Error') {
      message = '连接超时'
      showNotify({ type: 'danger', message: message })
      return Promise.reject(new Error(message))
    }
    if (error && error.response && error.response.status) {
      const status = error.response.status
      switch (status) {
        case 401:
          message = 'TOKEN过期'
          removeToken()
          break
        case 403:
          message = '无权访问'
          break
        case 404:
          message = '请求地址错误'
          break
        case 500:
          removeToken()
          message = '服务器异常'
          break
        default:
          message = '未知错误'
          break
      }
    }
    showNotify({ type: 'danger', message: message })
    router.push('login')
    return Promise.reject(new Error(message))
  }
)

export default request
