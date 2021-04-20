/*
 * @Description: 检查模块是否有权限
 * @Date: 2021-04-20 16:44:48
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-20 17:04:44
 */

export default {
  install: function(Vue, options) {
    Vue.prototype.checkModulePermission = function(moduleName, projectPermission, value) {
      // console.log(moduleName, projectPermission[moduleName], value)
      return cmp(moduleName, projectPermission, value)
    }
  }
}

export function cmp(moduleName, projectPermission, value) {
  // owner拥有所有权限
  if (projectPermission === undefined) {
    return true
  }
  if (moduleName.toLowerCase() === 'dashboard') {
    return true
  }
  // owner用于基础设置权限
  if (projectPermission.name === 'owner' && moduleName.toLowerCase() === 'basesetting') {
    return true
  }
  if (projectPermission[moduleName]) {
    // 模块权限
    const permission = projectPermission[moduleName]
    // 是否含有指定权限
    const hasPermission = permission.some(p => permission.includes(value))
    return hasPermission
  } else {
    return false
  }
}
