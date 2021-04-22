/*
 * @Description: svg-icon
 * @LastEditors: luqing
 * @Author: luqing
 * @Date: 2021-04-22 10:51:06
 * @LastEditTime: 2021-04-22 10:51:19
 */

import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
