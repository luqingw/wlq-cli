/*
 * @Description: 权限
 * @Date: 2021-04-20 17:48:27
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-21 19:23:11
 */

import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { _localStorage } from '@/plugins/storage'

// import getPageTitle from '@/utils/get-page-title'
import store from '@/store'
import { constantRoutes } from '@/router'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  // document.title = getPageTitle(to.meta.title)
  // const token = await _localStorage.getItem('token')
  // _localStorage.setItem('token', token)
  console.log('permission js')
  if (to.path === '/login') {
    await store.dispatch('permission/generateRoutes', constantRoutes)
    next()
    return
  } else {
    next()
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})
