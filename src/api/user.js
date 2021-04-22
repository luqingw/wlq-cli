/*
 * @Description: user api
 * @LastEditors: luqing
 * @Author: luqing
 * @Date: 2021-04-22 10:40:50
 * @LastEditTime: 2021-04-22 14:13:53
 */
const api = '/tw-template/'
import request from '@/utils/request'

export function Login(data) {
  return request({
    url: `${api}user/login`,
    method: 'post',
    data
  })
}

// 获取 token
export function GetToken(params) {
  return request({
    url: `${api}user/token`,
    method: 'get',
    params
  })
}
export function GetInfo(token) {
  return request({
    url: '${api}user/info',
    method: 'get',
    params: { token }
  })
}

export function Logout() {
  return request({
    url: `${api}user/logout`,
    method: 'post'
  })
}
