/*
 * @Description: moment
 * @Date: 2021-04-20 16:15:02
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-20 16:16:09
 */
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// import { LANG, i18n } from '../vue-i18n' 暂时不支持国际化

dayjs.extend(relativeTime)
// if (i18n.locale === LANG.ZH) {
//   dayjs.locale('zh-cn')
// }
dayjs.locale('zh-cn')
export default function install(Vue) {
  Vue.prototype.$moment = dayjs
}

function momentDetail(t) {
  return dayjs(t).format('YYYY-MM-DD HH:mm:ss')
}

// 距离现在的时间
function fromNow(t) {
  return dayjs(t).fromNow()
}

// 转换为阅读性更强的文本
// 1000 -> 1 秒
function humanize(t) {
  return dayjs(t).from(0, true)
}

// 时间长度
// 0 - 1000 -> 1 秒
function duration(start, end) {
  return humanize(dayjs(end).diff(dayjs(start)))
}

export { dayjs as moment, momentDetail, fromNow, duration, humanize }
