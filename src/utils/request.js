/*
 * @Description: 请求封装
 * @Date: 2021-04-20 16:44:48
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-22 13:19:20
 */
import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
// import { _localStorage } from '@/plugins/storage'
import store from '@/store'

import { getToken } from '@/utils/auth'
// import _ from 'lodash'

// const code431 = 0
// 重试上限次数
axios.defaults.retry = 1
axios.defaults.retryDelay = 1000
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: 'http://localhost:7077/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // if (_localStorage.token) {
    //   config.headers['token'] = _localStorage.token
    // }
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log('request error', error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  (response) => {
    // mock处理
    // const data = !_.isNil(response.data) ? response.data : response
    const data = response
    const code = response.status
    const message = response.message || ''
    // const headers = response.headers
    if (code !== 200 && code > 400 && code !== 402) {
      responseCode(data, code, message)
      return Promise.reject(new Error(message || 'Error'))
    } else if (response.headers['content-type'] === 'application/octet-stream') {

      // 文件流处理

    } else {
      return data
    }
  },
  (error) => {
    console.log('response error:' + error, error.config) // for debug
    NProgress.done()
    const config = error.config
    if (error.code === 'ECONNABORTED') {
      // 如果config不存在或未设置重试选项，请拒绝
      if (!config || !config.retry) return Promise.reject()
      // 设置变量跟踪重试次数
      config.__retryCount = config.__retryCount || 0
      // 检查是否已经达到最大重试总次数
      if (config.__retryCount >= config.retry) {
        // 抛出错误信息
        Message({
          message,
          type: 'error',
          duration: 3 * 1000
        })
        return Promise.reject('超时')
      }
      // 增加请求重试次数
      config.__retryCount += 1
      // 创建新的异步请求
      var backoff = new Promise(function(resolve) {
        setTimeout(function() {
          resolve()
        }, config.retryDelay || 1)
      })
      // 返回axios信息，重新请求
      return backoff.then(function() {
        return service(config)
      })
    }
    const code = error.response.status ? error.response.status : error.response
    const data = error.response.data || error.response
    const message = error.response.data.msg || ''
    responseCode(data, code, message, config)
    return Promise.reject(message)
  }
)

export default service

function responseCode(data, code, message, config) {
  console.log('request data code', data, code)
  // 登录失效
  if (code === 401) {
    MessageBox.confirm('登录失效', {
      confirmButtonText: 'confirm button',
      cancelButtonText: 'cancal button',
      type: 'warning',
      center: true
    }).then(() => {
      NProgress.start()
      setTimeout(function() {
        store.dispatch('user/logout').then(() => {
          location.reload()
        })
      }, 3000)
      NProgress.done()
    })
  } else if (code === 409) {
    Message({
      message: message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
  } else if (code === 403) {
    // 拒绝访问
    MessageBox.confirm('forbidden', {
      confirmButtonText: 'confirm button',
      cancelButtonText: 'cancal button',
      cancelButtonClass: 'is-plain',
      type: 'warning',
      center: true
    }).then(() => {
      // store.dispatch('user/resetToken').then(() => {
      //   location.reload()
      // })
      // router().replace({
      //   name: 'Dashboard'
      // })
      // window.location.reload()
    })
  } else if (code === 400) {
    // 请求配置中显示错误提示
    Message({
      message,
      type: 'error',
      duration: 5 * 1000
    })
    // 控制台输出错误
    console.log(message)
  } else if (code > 499) {
    // 请求配置中显示错误提示
    if (config.showMessage) {
      Message({
        message: message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    }
  } else {
    console.log('???----', 500)
    if (config.showMessage) {
      Message({
        message: message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    }
  }
  return Promise.reject(new Error(message || 'Error'))
}

// export default function service(config) {
//   return reqo(config)
// }
