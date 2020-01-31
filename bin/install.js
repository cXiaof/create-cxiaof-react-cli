'use strict'

const ora = require('ora')

module.exports = async (projectName, templatePath) => {
    const spinner = ora('安装其他依赖包')
    spinner.start()
    spinner.succeed()
    console.log(projectName, templatePath)
}
