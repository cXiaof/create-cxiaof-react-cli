'use strict'

const ora = require('ora')
const path = require('path')
const fs = require('fs-extra')

const handleError = require('./exit')

module.exports = async (directory) => {
    const spinner = ora('- 克隆CCRC模版')
    spinner.start()
    const templatePath = path.join(__dirname, '..', 'ccrc-template')
    await fs.copy(path.join(templatePath, 'template'), directory, (error) =>
        handleError(error, spinner)
    )
    spinner.succeed()
    return templatePath
}
