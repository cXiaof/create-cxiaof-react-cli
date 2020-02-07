'use strict'

const ora = require('ora')
const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')

const handleError = require('./exit')

module.exports = async (directory, useTS) => {
    const spinner = ora('- 克隆CCRC模版')
    spinner.start()

    let folder = 'ccrc-template'
    if (useTS) folder += '-ts'

    const templatePath = path.join(__dirname, '..', folder)
    await fs.copy(path.join(templatePath, 'template'), directory, (error) =>
        handleError(error, spinner)
    )

    spinner.succeed()
    return templatePath
}
