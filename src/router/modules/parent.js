/*
 * @Description: parent router modules
 * @Date: 2021-04-20 16:32:32
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-22 09:36:15
 */

// import Layout from '@/layout'

const parent = {
  path: '/parent',
  // component: Layout,
  hidden: false,
  component: { render: e => e('router-view') },

  meta: {
    title: 'parent menu',
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
