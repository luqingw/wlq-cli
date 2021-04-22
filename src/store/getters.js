/*
 * @Description: getter
 * @Date: 2021-04-20 16:38:51
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-22 11:13:55
 */

const getters = {
  size: state => state.app.size,
  device: state => state.app.device,
  permission_routes: state => state.permission.routes
}
export default getters
