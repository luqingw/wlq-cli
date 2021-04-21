/*
 * @Description: bin-test
 * @Date: 2021-04-20 19:38:45
 * @LastEditors: luqing
 * @LastEditTime: 2021-04-20 19:42:51
 */

/usr/bin/env node

const program = require('commander')
program
    .version(`Version is ${require('../package.json').version}`)
    .description('A simple CLI for building initialize project include Wechat applet, Vue, Egg (nodejs)')
    .usage('<command> [options]')
    .command('create')
    .option("-l --list", "project list", listOption)
    .action((name, cmd) => {
    	console.log(111)
        require('../lib/create')
    })
    .parse(process.argv)


console.log('test')
