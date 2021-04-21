/*
 * @Description:router entry
 * @Date: 2021-04-20 16:26:53
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-21 19:58:16
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
// import Layout from '@/layout'

import parent from './modules/parent'

export const constantRoutes = [
  parent,
  {
    path: '/redirect',
    // component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/home/index')
  },
  {
    path: '/home',
    component: () => import('@/views/home/index')
  },
  { path: '*', redirect: '/', hidden: true }
]
export const asyncRoutes = [
  // 这里存放动态路由
]

const createRouter = () => new Router({
  base: '/',
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
