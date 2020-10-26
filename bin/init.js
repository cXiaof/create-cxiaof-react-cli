'use strict'

const commander = require('commander')
const ora = require('ora')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const handleError = require('./exit')

const packageJson = require('../package.json')

module.exports = async () => {
    let projectName
    new commander.Command(packageJson.name)
        .version(packageJson.version)
        .arguments('<projectName>')
        .action((name) => (projectName = name))
        .parse(process.argv)

    if (typeof projectName === 'undefined') {
        console.error('缺少项目名称')
        process.exit(1)
    }

    const spinner = ora(`- 使用CRA初始项目：${projectName}`)
    spinner.start()
    await exec(`npx create-react-app ${projectName}`)
        .then(({ error }) => handleError(error, spinner))
        .catch((error) => handleError(error, spinner))
    spinner.succeed()

    return projectName
}
