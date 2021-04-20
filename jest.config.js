/*
 * @Description: jest 配置
 * @Date: 2021-04-20 15:53:08
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-20 15:55:58
 */

module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    // 'src/utils/**/*.{js,vue}',
    'src/utils/test.js'
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  // 'collectCoverage': true,
  coverageReporters: ['lcov', 'text-summary'],
  testURL: 'http://localhost/'
}
