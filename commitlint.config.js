/*
 * @Description: commit 校验规则
 * @Date: 2021-04-20 15:53:08
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-20 15:54:02
 */
module.exports = {
  extends: [
    'cz'
  ],
  rules: {
    // 必须添加
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72]
  }
}
