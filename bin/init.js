'use strict'

const commander = require('commander')
const ora = require('ora')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const handleError = require('./exit')

const packageJson = require('../package.json')

module.exports = async () => {
    let projectName
    let projectOptions
    new commander.Command(packageJson.name)
        .version(packageJson.version)
        .arguments('<projectName>')
        .option('-ts, --typescript', '使用typescript模版')
        .option('-sp, --specified', '使用指定版本的依赖包')
        .allowUnknownOption()
        .action((name, options) => {
            projectName = name
            projectOptions = options
        })
        .parse(process.argv)

    if (typeof projectName === 'undefined') {
        console.error('缺少项目名称')
        process.exit(1)
    }

    let oraText = `- 使用CRA初始项目：${projectName}`
    let execCMD = `npx create-react-app ${projectName}`
    if (projectOptions.typescript) {
        oraText += ' (typescript)'
        execCMD += ' --template typescript'
    }
    const spinner = ora(oraText)

    spinner.start()
    await exec(execCMD)
        .then(({ error }) => handleError(error, spinner))
        .catch((error) => handleError(error, spinner))
    spinner.succeed()

    return [projectName, projectOptions]
}
