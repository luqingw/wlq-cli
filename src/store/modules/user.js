import { Login, GetInfo } from '@/api/user'
import { setToken } from '@/utils/auth'
// import router, { resetRouter } from '@/router'
import Cookies from 'js-cookie'

// import { Login, GetInfo } from '@/api/user'
import { resetRouter } from '@/router'
import { _localStorage } from '@/plugins/storage'

const state = {
  name: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login 正常业务逻辑
  login({ commit }, userInfo) {
    console.log('store action userInfo', userInfo)
    // const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // const data = {
      //   username: username.trim(),
      //   password: password
      // }
      Login(userInfo)
        .then((response) => {
          console.log('login response', response)
          const { token } = response
          Cookies.set('Token', token)
          commit('SET_TOKEN', token)
          setToken(token)
          if (token) {
            _localStorage.token = token
          }
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // get user info
  getInfo({ commit }) {
    const token = _localStorage.token
    return new Promise((resolve, reject) => {
      GetInfo(token)
        .then((response) => {
          // const { user } = response.data
          // 新增 isAdmin 字段，如果是 admin ，可以看到并操作 license，否则无法看到 license
          // 这里需要使用到动态路由
          const { is_admin } = response.data.user
          _localStorage.is_admin = is_admin
          // const name = user.user_name || 'admin'
          const name = 'admin'
          const roles = 'admin'
          commit('SET_ROLES', roles)
          commit('SET_NAME', name)
          _localStorage.userName = name
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // user logout
  logout({ dispatch }) {
    return new Promise((resolve) => {
      _localStorage.clear()
      resetRouter()
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  }
}

// const actions = {
//   // user login
//   login({ commit }, userInfo) {
//     const { username, password } = userInfo
//     return new Promise((resolve, reject) => {
//       login({ username: username.trim(), password: password }).then(response => {
//         const { data } = response
//         commit('SET_TOKEN', data.token)
//         setToken(data.token)
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // get user info
//   getInfo({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       getInfo(state.token).then(response => {
//         const { data } = response

//         if (!data) {
//           reject('Verification failed, please Login again.')
//         }

//         const { roles, name, avatar, introduction } = data

//         // roles must be a non-empty array
//         if (!roles || roles.length <= 0) {
//           reject('getInfo: roles must be a non-null array!')
//         }

//         commit('SET_ROLES', roles)
//         commit('SET_NAME', name)
//         commit('SET_AVATAR', avatar)
//         commit('SET_INTRODUCTION', introduction)
//         resolve(data)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // user logout
//   logout({ commit, state, dispatch }) {
//     return new Promise((resolve, reject) => {
//       logout(state.token).then(() => {
//         commit('SET_TOKEN', '')
//         commit('SET_ROLES', [])
//         removeToken()
//         resetRouter()

//         // reset visited views and cached views
//         // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
//         dispatch('tagsView/delAllViews', null, { root: true })

//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // remove token
//   resetToken({ commit }) {
//     return new Promise(resolve => {
//       commit('SET_TOKEN', '')
//       commit('SET_ROLES', [])
//       removeToken()
//       resolve()
//     })
//   },

//   // dynamically modify permissions
//   async changeRoles({ commit, dispatch }, role) {
//     const token = role + '-token'

//     commit('SET_TOKEN', token)
//     setToken(token)

//     const { roles } = await dispatch('getInfo')

//     resetRouter()

//     // generate accessible routes map based on roles
//     const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
//     // dynamically add accessible routes
//     router.addRoutes(accessRoutes)

//     // reset visited views and cached views
//     dispatch('tagsView/delAllViews', null, { root: true })
//   }
// }

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
