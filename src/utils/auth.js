/*
 * @Description: auth
 * @LastEditors: luqing
 * @Author: luqing
 * @Date: 2021-04-22 13:04:18
 * @LastEditTime: 2021-04-22 13:04:22
 */

import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
