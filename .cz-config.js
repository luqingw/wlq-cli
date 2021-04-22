/*
 * @Description: cz-config
 * @Date: 2021-04-20 18:04:26
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-22 16:01:40
 */

'use strict'
module.exports = {
  types: [
    { value: 'feat', name: '🌟 新功能:     🌟  一个新功能' },
    { value: 'fix', name: '🐛 Bug 修复:      🐛  一个 bug 修复' },
    { value: 'docs', name: '📝 文档:    📝  只有文档发生改变' },
    {
      value: 'style',
      name:
        '🎨 代码样式:    🎨  对代码含义无影响的改动（空格，格式化，等，非 UI 变动）',
    },
    {
      value: 'refactor',
      name:
        '🔨 代码重构: 🔨  既不是修复 bug 也不是添加新功能的代码更改',
    },
    {
      value: 'perf',
      name: '🚀 性能优化:     🚀  提升性能的代码更改',
    },
    { value: 'test', name: '🔧 测试:     🔧  添加一些缺失的测试或者修正已存在的测试' },
    {
      value: 'chore',
      name:
        '🏠 构建:    🏠  影响构建系统或外部依赖的更改（例如：gulp，npm，webpack）',
    },
    { value: 'revert', name: '🔙 撤销:   🔙  撤销上一次的提交' },
    { value: 'WIP', name: 'WIP:      进行中' },
  ],
  scopes: [
    { name: 'global' },
    { name: 'ui' },
    { name: 'data' },
    { name: 'component' },
    { name: 'unknown' },
  ],
  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
    {name: 'merge'},
    {name: 'style'},
    {name: 'e2eTest'},
    {name: 'unitTest'}
    ]
  },
*/
// override the messages, defaults are as follows
messages: {
    type: "选择你提交的信息类型:",
    scope: '\n（非必填）本次提交的改变所影响的范围？',
    // used if allowCustomScopes is true
    customScope: '标示这次的变更:',
    subject: '（必填）写一个简短的变化描述:\n',
    body:
      '（非必填）提供更详细的变更描述. 使用 "|" 断行:\n',
    breaking: '（非必填）列出所有的不兼容变更:\n',
    confirmCommit: '你确认要提交么？',
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // limit subject length
  subjectLimit: 100,
}