/*
 * @Description: mock api
 * @LastEditors: luqing
 * @Author: luqing
 * @Date: 2021-04-22 09:53:33
 * @LastEditTime: 2021-04-22 10:37:58
 */

import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/mock/mock-example',
    method: 'get',
    params
  })
}
