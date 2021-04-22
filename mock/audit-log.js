/*
 * @Description: mock audit
 * @LastEditors: luqing
 * @Author: luqing
 * @Date: 2021-04-21 17:30:00
 * @LastEditTime: 2021-04-21 17:31:47
 */

import Mock from 'mockjs'

const data = Mock.mock({
  'items|60': [{                          // 生成10个数组
    duration: '@int(2,40)',
    display_time: '@datetime',
    'type|1':['查看','删除','发布'],
    ip: '@ip',
    'status|1': ['成功', '失败'],
    'namespace|1': ['default', 'test'],

  }]
})

export default [
  {
    url: '/vue-element-admin/audit/list',
    type: 'get',
    response: config => {
      let items = data.items
      const { namespace } = config.query
      if (namespace) {
        let tempList = []
        for (const item of items) {
          if (item.namespace === namespace) {
            tempList.push(item)

          }
        }
         items = tempList
      }
      
      return {
        code: 20000,
        data: {
          total: items.length,
          items
        }
      }
    }
  },
  
]

