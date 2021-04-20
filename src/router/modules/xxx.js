/*
 * @Description: xxx router modules
 * @Date: 2021-04-20 16:32:32
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-20 16:37:19
 */

import Layout from '@/layout'

const xxx = {
  path: '/xxx',
  component: Layout,
  hidden: false,
  meta: {
    title: '目录菜单',
    icon: 'menu icon'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/xxx/index'),
      name: 'XXX',
      meta: { title: 'xxx', icon: 'menu2 icon', noCache: true }
    }
  ]
}
export default xxx