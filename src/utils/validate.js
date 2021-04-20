/*
 * @Description: 常见校验
 * @Date: 2021-04-20 16:44:48
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-20 17:18:48
 */

/** 应用名称
  * 英文、数字、-组合，且只能数字/英文开头，首尾不能空格，中国中间可空格
  */
export function isAppName(data) {
  return /^([a-zA-Z0-9])+(\s?[a-zA-Z0-9\-]+)*$/.test(data)
}

/** 通常名称
 * 首尾不能空格，中间可空格
 */
export function isName(data) {
  return /^([\S\u4e00-\u9fa5])+(\s?[\S\u4e00-\u9fa5]+)*$/.test(data)
}

/** 角色名称
 * 中英文、数字组合，且只能中英文开头
 */
// \s 任何空白字符 \S:非空白字符
export function isNormalName(data) {
  // return /^([\S\u4e00-\u9fa5])+(\s?[\S\u4e00-\u9fa5]+)*$/.test(data)
  return /^([a-zA-Z\u4e00-\u9fa5])+(\s*[a-zA-Z0-9\u4e00-\u9fa5]+)*$/.test(data)
}

/** 路由
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

export const validatePhone = (phone) => {
  const reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
  return reg.test(phone)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/** 验证字符是否全都为空格
 * @param {String} str
 */
export function isAllEmpty(str) {
  if (str && str.length > 0 && str.split(' ').join('').length === 0) {
    return false
  }
  return true
}

/**
 * 创建灰度发布任务 版本号验证  小写字母，数字，中划线，点
 * @param {String} str
 */
export function validVersion(str) {
  const reg = /^[a-z0-9\-\.]+$/g

  return reg.test(str)
}

/**
 * 网关配置 域名 只能英文 中划线 数字 不能以 . 结尾
 * @param {String} str
 */
export function validSubhostName(str) {
  const reg = /^[a-z0-9][a-z0-9\-\._]*(?<![.])$/
  return reg.test(str)
}
