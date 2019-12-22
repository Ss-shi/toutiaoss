import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function () {})
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '手机号或者验证码错误'
      break
    case 403:
      router.push('./login')
      break
    case 401:
      router.push('./login')
      break
    case 404:
      message = '手机号不正确'
      break
    case 507:
      message = '服务器数据库异常'
      break
    default:
      break
  }
  Message({ type: 'warning', message })
})
export default axios
