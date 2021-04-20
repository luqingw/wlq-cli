/*
 * @Description: 权限
 * @Date: 2021-04-20 17:48:27
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-20 17:48:39
 */

import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { _localStorage } from '@/plugins/storage'

import getPageTitle from '@/utils/get-page-title'
import store from '@/store'
import { constantRoutes } from '@/router'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  const token = await _localStorage.getItem('token')
  _localStorage.setItem('token', token)
  if (to.path === '/login') {
    next()
    return
  } else {
    const userRoles = store.getters.roles
    if (userRoles === 'admin') {
      next()
      return
    } else {
      try {
        // await store.dispatch('user/getInfo')
        next()
      } catch (error) {
        await store.dispatch('user/resetToken')
        next(`/login`)
        NProgress.done()
      }
    }
  }
  if (token === 'undefined' || !token) {
    next('/login')
    return
  }
  if (token !== 'undefined') {
    const routes = store.getters.permission_routes
    if (routes.length) {
      return
    } else {
      await store.dispatch('permission/generateRoutes', constantRoutes)
    }
    await store.dispatch('license/getLicenseInfo')
    next()
    return
  } else {
    next('/login')
  }
})

router.afterEach(() => {
  NProgress.done()
})
