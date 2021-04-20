/*
 * @Description: sonar
 * @Date: 2021-04-20 15:53:08
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-20 15:59:46
 */
const sonarqubeScanner = require('sonarqube-scanner')
const parameters = {
  serverUrl: 'http://192.168.60.23:9000',
  token: '898a575384e2383ee354c3896f6243100ed94528',
  options: {
    'sonar.projectVersion': '1.1',
    'sonar.projectName': 'create-server',
    'sonar.projectKey': 'create-server',
    'sonar.sourceEncoding': 'UTF-8',
    'sonar.scm.provider': 'git',
    'sonar.language': 'js',
    'sonar.sources': 'src',
    'sonar.tests': 'tests',
    'sonar.inclusions': 'src/utils/test.js',
    'sonar.exclusions': '**/node_modules/**,**/coverage/**',
    'sonar.test.inclusions': 'tests/**/*.spec.js',
    'sonar.testExecutionReportPaths': 'tests/unit/coverage/test-reporter.xml',
    'sonar.javascript.lcov.reportPaths': 'tests/unit/coverage/lcov.info'
  }
}
sonarqubeScanner(parameters, () => process.exit())
