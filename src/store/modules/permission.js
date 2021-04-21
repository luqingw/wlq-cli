/*
 * @Description: permission
 * @LastEditors: luqing
 * @Author: luqing
 * @Date: 2021-04-21 19:24:20
 * @LastEditTime: 2021-04-21 19:26:09
 */
// 改造 tw-router
export function initRoute(constantRoutes) {
  const twRouter = []

  // const constantRoutes = []
  let rs = []
  constantRoutes.forEach((r) => {
    rs.push(r)
    r.ppath = r.path
    if (r.children) {
      r.children.forEach((c) => {
        c.ppath = `${r.path}/${c.path}`
        rs.push(c)
      })
    }
  })
  rs = rs.filter(r => r.meta && r.meta.group)
  rs.forEach((r) => {
    if (!twRouter[r.meta.group]) {
      twRouter[r.meta.group] = {
        children: []
      }
    }
    twRouter[r.meta.group].children.push({
      title: r.meta.title,
      path: r.ppath,
      icon: r.meta.icon
    })
  })
  return twRouter
}
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, constantRoutes) => {
    // state.addRoutes = constantRoutes // 如果要动态加载路由 数据结构就会有问题
    state.routes = constantRoutes
  }
}
const actions = {
  generateRoutes({ commit }, constantRoutes) {
    return new Promise((resolve) => {
      constantRoutes = initRoute(constantRoutes)
      commit('SET_ROUTES', constantRoutes)
      resolve(constantRoutes)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
