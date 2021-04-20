/*
 * @Description: filter
 * @Date: 2021-04-20 16:44:48
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-20 17:07:50
 */

/**
 * 根据现有list，收集ns
 * @param {Array} arr
 */
export function filterNS(list) {
  var tempList = []
  var arr = []
  if (list) {
    list.forEach((i) => {
      tempList.push(i.ns)
    })
    arr = [...new Set(tempList)]
  }
  return arr
}


