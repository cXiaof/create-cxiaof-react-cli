#! /usr/bin/env node
'use strict'

const commander = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const { exec } = require('child_process')

const packageJson = require('../package.json')

let projectName
let typescript

const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<projectName>')
    .usage('<projectName> [options]')
    .action((name) => (projectName = name))
    .option('--typescript', '使用typescript模版（暂未开发）')
    .allowUnknownOption()
    .parse(process.argv)

if (typeof projectName === 'undefined') {
    console.error('缺少项目名称')
    process.exit(1)
}

typescript = !!program.typescript

let oraText = `使用CRA初始项目：${projectName}`
let execCMD = `npm init react-app ${projectName}`
if (typescript) {
    oraText += '(typescript)'
    // execCMD += ' --typescript'
}
const spinner = ora(oraText)
spinner.start()

exec(execCMD, function(error) {
    if (error) {
        spinner.fail()
        console.error(`error: ${error}`)
        process.exit(1)
    }
    spinner.succeed()
})
