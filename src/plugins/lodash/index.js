/*
 * @Description: lodash
 * @Date: 2021-04-20 16:13:45
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-20 16:14:23
 */
import _ from 'lodash'

window._ = _

export default function install(Vue) {
  Vue.prototype.$_ = _
}
