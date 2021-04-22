/*
 * @Description: main entry
 * @Date: 2021-04-20 14:20:44
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-22 14:39:59
 */

import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import Plugins from '@/plugins'
import './public-path'

import '@/styles/style.scss' // 单独引入

import App from './App'
import store from './store'
import router from './router'

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.use(router)
Vue.use(Plugins)

// import '@/assets/svg-icons/index' // icon
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import '@/styles/index.scss' // global css

import axios from 'axios'
Vue.prototype.$axios = axios

const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
Vue.prototype.$echarts = echarts
// 挂载 resize 方法
Vue.prototype.$echartsResize = function(ref) {
  window.addEventListener('resize', function() {
    ref.resize()
  })
}

// import * as filters from './filters' // global filters

import { _typeof } from './utils'

// import checkModulePermission from './utils/check-module-permission'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// 全局类型判断
Vue.prototype._typeof = _typeof

Vue.prototype.qiankun = window.__POWERED_BY_QIANKUN__
// register global utility filters
// Object.keys(filters).forEach((key) => {
//   Vue.filter(key, filters[key])
// })

Vue.config.productionTip = false

// Vue.use(checkModulePermission)
Vue.prototype.instance = instance
// new Vue({
//   router: router,
//   i18n,
//   store,
//   render: h => h(App)
// }).$mount('#app')
// 子应用模式
let instance = null
let routerA = null

export async function bootstrap() {
  console.log('vue app bootstraped')
}

export async function mount(props) {
  console.log('props from main framework', props)
  routerA = router
  instance = new Vue({
    router: routerA,
    store,
    render: h => h(App)
  }).$mount('#app')
}

export async function unmount() {
  instance.$destroy()
  instance = null
  routerA = null
}
