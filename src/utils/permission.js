/*
 * @Description: 权限管理
 * @Date: 2021-04-20 16:44:48
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-20 17:09:43
 */

import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => permissionRoles.includes(role))

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}
