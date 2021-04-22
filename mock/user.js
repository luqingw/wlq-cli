/*
 * @Description: mock user
 * @LastEditors: luqing
 * @Author: luqing
 * @Date: 2021-04-21 17:30:00
 * @LastEditTime: 2021-04-22 15:07:47
 */
// const tokens = {
//   admin: {
//     token: 'admin'
//   },
//   editor: {
//     token: 'editor-token'
//   }
// }
// import Mock from 'mockjs'

const users = {
  'admin': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}
const api = '/lq-template'
export default [
  // user login
  {
    url: `${api}/user/login`,
    type: 'post',
    response: (config) => {
      console.log('config', config)
      // const { username } = config.body
      // const token = tokens[username]
      const token = 'twdt-admin'

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 200,
        data: token
      }
    }
  },

  // get user info
  {
    url: `${api}/user/info\.*`,
    type: 'get',
    response: (config) => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: `${api}/user/logout`,
    type: 'post',
    response: _ => ({
      code: 20000,
      data: 'success'
    })
  }
]
