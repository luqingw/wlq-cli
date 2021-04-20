
import { PREFIX } from '../plugins/storage'

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (!time) {
    return '暂无时间'
  }
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 根据字段去重
 * @param {array} arr
 * @param {string} name
 * @returns {string}
 */
export function arrayUnique2(arr, name) {
  var hash = {}
  return arr.reduce(function(item, next) {
    hash[next[name]] ? '' : (hash[next[name]] = true && item.push(next))
    return item
  }, [])
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  // const now = Date.now()
  // TODO: 暂时用不到
  // const diff = (now - d) / 1000

  // if (diff < 30) {
  //   return '刚刚'
  // } else if (diff < 3600) {
  //   // less 1 hour
  //   return Math.ceil(diff / 60) + '分钟前'
  // } else if (diff < 3600 * 24) {
  //   return Math.ceil(diff / 3600) + '小时前'
  // } else if (diff < 3600 * 24 * 2) {
  //   return '1天前'
  // }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * 获取当前页面的查询参数 (Query Parameters)
 * 1. xxx.com#dao?a=b
 * 2. xxx.com?a=b
 * 3. xxx.com/dao?a=b
 * @return {object} - { a: 'b' }
 */
export function parseQueryParams() {
  const str = window.location.href
  const queryStr = str.slice(str.indexOf('?'))
  const obj = {}
  const reg = /[?&][^?&]+=[^?&]+/g
  // ['?id=12345','a=1']
  const arr = queryStr.match(reg)
  if (arr) {
    arr.forEach((item) => {
      const tempArr = item.substring(1).split('=')
      const key = decodeURIComponent(tempArr[0])
      const value = decodeURIComponent(tempArr[1])
      obj[key] = value
    })
  }
  return obj
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1;i >= 0;i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0;i < actual.length;i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map((key) => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    `{"${decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ')}"}`
  )
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout,
    args,
    context,
    timestamp,
    result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * @description: 计算时间差
 * @param {Date} time 需要计算的时间
 * @param {Date} nowTime 当前时间
 * @return: 时间差字符串
 * @author: mayako
 */
export function get_time_diff(time, nowTime) {
  var diff = ''
  if (!nowTime) {
    nowTime = new Date().getTime()
  }
  var time_diff = nowTime - time
  // 计算相差天数
  var days = Math.floor(time_diff / (24 * 3600 * 1000))
  if (days > 0) {
    diff += days + '天'
  }
  // 计算相差小时数
  var leave1 = time_diff % (24 * 3600 * 1000)
  var hours = Math.floor(leave1 / (3600 * 1000))
  if (hours > 0) {
    diff += hours + '小时'
  } else {
    if (diff !== '') {
      diff += hours + '小时'
    }
  }
  // 计算相差分钟数
  var leave2 = leave1 % (3600 * 1000)
  var minutes = Math.floor(leave2 / (60 * 1000))
  if (minutes > 0) {
    diff += minutes + '分'
  } else {
    if (diff !== '') {
      diff += minutes + '分'
    }
  }
  // 计算相差秒数
  var leave3 = leave2 % (60 * 1000)
  var seconds = Math.round(leave3 / 1000)
  if (seconds > 0) {
    diff += seconds + '秒'
  } else {
    if (diff !== '') {
      diff += seconds + '秒'
    }
  }

  return diff
}

/**
 * @description: 标签名必须是有效的ASCII，可以包含小写和大写字母、数字、下划线、句点和破折号。标签名不能以句点或破折号开头
 * @param {string} 文件名
 * @return: 结果
 * @author: mayako
 */

export function inputASCII(value) {
  if (value === '') {
    return false
  } else {
    if (value !== '') {
      var reg = /^([a-zA-z0-9])([a-zA-z0-9\_\-\.])*$/
      if (!reg.test(value)) {
        return false
      }
    }
    return true
  }
}

/**
 * @description: 双数组循环匹配4N
 * @param {arr} 数组1
 * @param {arr2} 数组2
 * @param {key} 键值
 * @return: 数组
 * @author: mayako
 */
export function listMate(arr, arr2, key) {
  const map1 = {}
  const map2 = {}
  arr = deepClone(arr)
  arr2 = deepClone(arr2)
  arr2.forEach((row) => {
    map2[row[key]] = row
  })
  arr.forEach((row) => {
    if (map2[row[key]]) {
      map1[row[key]] = Object.assign(row, map2[row[key]])
    } else {
      map1[row[key]] = row
    }
  })
  arr2.forEach((row) => {
    if (!map1[row[key]]) {
      map1[row[key]] = map2[row[key]]
    }
  })
  const array = []
  for (const key in map1) {
    const obj = map1[key]
    array.push(obj)
  }
  return array
}

/**
 * @description: 类型判断
 * @param {any} obj 任何参数
 * @return: 参数类型(小写)
 * @author: mayako
 */
export function _typeof(obj) {
  var s = Object.prototype.toString.call(obj)
  return s.match(/\[object (.*?)\]/)[1].toLowerCase()
}

/**
 * @description: 取文件名后缀
 * @param {string} 文件名
 * @return: 文件名后缀
 * @author: mayako
 */
export function extname(filename) {
  var str = ''
  // lastIndexOf()查找指定字符在字符串里面最后一次出现的下标，找不到的话返回-1
  var index1 = filename.lastIndexOf('.')
  // 获取字符串长度
  var index2 = filename.length
  // index1为0时代表第一个字符为'.',这种情况下没有后缀名
  if (index1 >= 1) {
    str = filename.substring(index1, index2)
  }
  return str
}

/** 切割名字首字母为头像
 * @param {String} name
 * @returns {string}
 */
export function cutFirstNameToAvatar(name) {
  return name !== undefined && name !== '' ? name.substr(0, 1) : ''
}

/** 获取url参数
 * @param {String} url
 * @param {String} key
 */
export function getURLParams(url, key) {
  const ourl = new URL(url)
  return ourl.searchParams.get(key)
}

/** 保存state到sessionStorage
 */
export function saveStateToSessionStorage(state) {
  sessionStorage.setItem(PREFIX + 'storageState', state)
}

/** 获取sessionStorage
 */
export function getStateFromSessionStorage() {
  return sessionStorage.getItem(PREFIX + 'storageState')
}

/** 清除sessionStorage
 */
export function clearSessionStorage() {
  sessionStorage.clear()
}

/**
 * 获取今天 ( 0 )，昨天 ( -1 )，前天 ( -2 )
 * @param {Number} number
 */
export function getDateString(number) {
  const nowDate = new Date()
  const resDate = nowDate.setDate(nowDate.getDate() + number)
  return parseTime(new Date(resDate), '{y}-{m}-{d}')
}

export function generateTitle(title) {
  const hasKey = this.$te('sidebar.' + title.toLowerCase())

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('sidebar.' + title.toLowerCase())

    return translatedTitle
  } else if (this.$te('sidebar.' + title)) {
    const translatedTitle = this.$t('sidebar.' + title)
    return translatedTitle
  }
  return title
}

/**
 * 删除对象空值属性
 * @param {object} obj 要删除空值的对象
 */
export function dealElement(obj) {
  var param = {}
  if (obj === null || obj === undefined || obj === '') return param
  for (var key in obj) {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      param[key] = obj[key]
    }
  }
  return param
}

/**
 * 判断对象属性是否有空值
 * @param {object} obj 需要判断的对象
 * @returns {boolean} 是否有空值
 */
export function propHasEmpty(obj) {
  return Object.values(obj).some(item => item === '')
}

/**
 * (对象深拷贝)
 * @param {object} obj copy的对象
 * @return {object} 深拷贝返回对象
 */

export function deepCloneJson(obj) {
  if (obj === null) return null
  if (typeof obj !== 'object') return obj
  if (obj.constructor === Date) return new Date(obj)
  if (obj.constructor === RegExp) return new RegExp(obj)
  const newObj = new obj.constructor() // 保持继承链
  for (const key of Object.keys(obj)) {
    if (obj.hasOwnProperty(key)) {
      // 不遍历其原型链上的属性
      const val = obj[key]
      newObj[key] = typeof val === 'object' ? deepCloneJson(val) : val // 使用arguments.callee解除与函数名的耦合
    }
  }
  return newObj
}

/**
 * (是否是空对象) 只针对{}, 特殊情况请用type函数过滤
 * @param {object} obj 判断的对象
 * @return {boolean} true空对象/false非空对象
 */
export function isEmptyObject(obj) {
  for (const name in obj) {
    return false
  }
  return true
}
