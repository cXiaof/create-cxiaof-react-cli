'use strict'

const commander = require('commander')
const ora = require('ora')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const handleError = require('./exit')

const packageJson = require('../package.json')

module.exports = async () => {
    let projectName
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

    const typescript = !!program.typescript

    let oraText = `使用CRA初始项目：${projectName}`
    let execCMD = `npx create-react-app ${projectName}`
    if (typescript) {
        oraText += '(typescript)'
        // execCMD += ' --typescript'
    }
    const spinner = ora(oraText)
    spinner.start()

    const create = await exec(execCMD)
    handleError(create.error, spinner)

    const cd = await exec(`cd ${projectName}`)
    handleError(cd.error, spinner)

    spinner.succeed()
    return projectName
}
