'use strict'

const ora = require('ora')
const path = require('path')
const fs = require('fs-extra')

const handleError = require('./exit')

module.exports = async (directory, options) => {
  const spinner = ora('- 克隆CCRC模版')
  spinner.start()
  const templatePath = path.join(__dirname, '..', 'ccrc-template')

  let folder = 'template'
  await fs.copy(path.join(templatePath, folder), directory, (error) =>
    handleError(error, spinner),
  )
  folder += options.typescript ? '-ts' : '-js'
  await fs.copy(path.join(templatePath, folder), directory, (error) =>
    handleError(error, spinner),
  )

  spinner.succeed()
  return templatePath
}
