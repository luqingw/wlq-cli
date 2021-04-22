/*
 * @Description: confirm
 * @LastEditors: luqing
 * @Author: luqing
 * @Date: 2021-04-22 10:24:02
 * @LastEditTime: 2021-04-22 10:24:19
 */
import { MessageBox } from 'element-ui'

export function handleConfirm(text = '确定执行此操作吗？', type = 'warning') {
  return MessageBox.confirm(text, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type,
    cancelButtonClass: 'is-plain',
    center: true
  })
}
