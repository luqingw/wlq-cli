/*
 * @Description: store app module
 * @Date: 2021-04-20 16:40:21
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-20 16:42:00
 */
import Cookies from 'js-cookie'

const state = {
  device: 'desktop',
//   qiankun: window.__POWERED_BY_QIANKUN__,
  size: Cookies.get('size') || 'medium'
}

const mutations = {
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  }
}

const actions = {
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  state,
  mutations,
  actions
}
