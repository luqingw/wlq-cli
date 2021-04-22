/*
 * @Description: permission
 * @LastEditors: luqing
 * @Author: luqing
 * @Date: 2021-04-21 19:24:20
 * @LastEditTime: 2021-04-22 11:28:03
 */
const state = {
  routes: [],
  addRoutes: [] // 预留
}

const mutations = {
  SET_ROUTES: (state, constantRoutes) => {
    // state.addRoutes = constantRoutes // 如果要动态加载路由 数据结构就会有问题
    state.routes = constantRoutes
  }
}
const actions = {
  // generateRoutes({ commit }, constantRoutes) {
  //   return new Promise((resolve) => {
  //     // constantRoutes = initRoute(constantRoutes)
  //     commit('SET_ROUTES', constantRoutes)
  //     resolve(constantRoutes)
  //   })
  // }
  generateRoutes({ commit }, constantRoutes) {
    return new Promise((resolve) => {
      // let accessedRoutes
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      commit('SET_ROUTES', constantRoutes)
      resolve(constantRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
