/*
 * @Description: storage
 * @Date: 2021-04-20 16:19:18
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-20 16:23:21
 */
/**
 * PREFIX 填写应用前缀
 */
const PREFIX = 'TW_'
const LANG = PREFIX + 'LANG'
function formatKey(key) {
  return (PREFIX + key).toUpperCase()
}

/**
  * AUTH
  */

const TOKEN = PREFIX + formatKey('token')

export const _localStorage = {
  //  token
  get token() {
    return localStorage.getItem(TOKEN)
  },
  set token(token) {
    localStorage.setItem(TOKEN, token)
  },

  clear: () => {
    // 只保留语言
    const lang = localStorage.getItem(LANG)
    localStorage.clear()
    if (lang) {
      localStorage.setItem(LANG, lang)
    }
  },

  getItem(key) {
    return localStorage.getItem(formatKey(key))
  },

  setItem(key, val) {
    return localStorage.setItem(formatKey(key), val)
  }
}

export default function install(Vue) {
  Vue.prototype.$storage = _localStorage
}
export { PREFIX }
