/*
 * @Description: 获取页面 title
 * @Date: 2021-04-20 16:44:48
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-20 17:08:21
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || 'TW'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle}`
  }
  return `${title}`
}
