/*
 * @Description:home route
 * @Date: 2021-04-20 16:27:13
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-21 19:14:46
 */
const home = {
  path: '/home',
  component: Layout,
  hidden: false,
  meta: {
    title: 'Home menu',
    icon: 'menu icon'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/home/index'),
      name: 'Home',
      meta: { title: 'home', icon: 'menu2 icon', noCache: true }
    }
  ]
}
export default home
