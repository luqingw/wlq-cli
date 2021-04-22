/*
 * @Description: mock api
 * @LastEditors: luqing
 * @Author: luqing
 * @Date: 2021-04-22 09:53:33
 * @LastEditTime: 2021-04-22 15:08:06
 */

import request from '@/utils/request'
const api = '/lq-template'

export function fetchList(params) {
  return request({
    url: `${api}/article/list`,
    method: 'get',
    params
  })
}
