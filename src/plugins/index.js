/*
 * @Description: plugin entry
 * @Date: 2021-04-20 16:24:26
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-20 16:26:17
 */
import storage from '@/plugins/storage'
import Vuemoment from '@/plugins/moment'
import Vuelodash from '@/plugins/lodash'
import VueMonitor from '@/plugins/monitor'

export default function install(Vue) {
  Vue.use(VueMonitor)
  Vue.use(storage)
  Vue.use(Vuemoment)
  Vue.use(Vuelodash)
}
