/*
 * @Description: permission
 * @LastEditors: luqing
 * @Author: luqing
 * @Date: 2021-04-20 17:48:27
 * @LastEditTime: 2021-04-22 14:49:04
 */
import { _localStorage } from '@/plugins/storage'

import { constantRoutes } from '@/router'
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
// import { _localStorage } from '@/plugins/storage'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  const token = await _localStorage.getItem('token')
  console.log('token', token)
  // _localStorage.setItem('token', token)

  // 如果token是 null 或者 undefined 回到 login 页面
  if (token == null || token === 'null' || token === 'undefined' || !token) { /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
    console.log('no token')
    NProgress.done()
  } else {
    if (to.path === '/login') {
      console.log('have token but to login')
      next({ path: '/' })
      NProgress.done()
    } else {
      console.log('other')
      try {
        next()
      } catch (error) {
        // remove token and go to login page to re-login
        await store.dispatch('user/resetToken')
        Message.error(error || 'Has Error')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  }

  if (token !== 'undefined' || token === 'null' || token == null) {
    const routes = store.getters.permission_routes
    if (routes.length) {
        NProgress.done()
        return
    } else {
      await store.dispatch('permission/generateRoutes', constantRoutes)
    }
    next()
      NProgress.done()
      return
  } else {
    next('/login')
  }

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
})

