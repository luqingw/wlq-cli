/*
 * @Description: parent router modules
 * @Date: 2021-04-20 16:32:32
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-21 20:00:31
 */

// import Layout from '@/layout'

const parent = {
  path: '/parent',
  // component: Layout,
  hidden: false,
  meta: {
    title: '目录菜单',
    icon: 'menu icon'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/parent/index'),
      name: 'Parent',
      meta: { title: 'parent', icon: 'menu2 icon', noCache: true }
    },
    {
      path: 'child1',
      component: () => import('@/views/child1/index'),
      name: 'Child1',
      meta: { title: 'child1', icon: 'menu2 icon', noCache: true }
    }
  ]
}
export default parent
