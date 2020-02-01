#! /usr/bin/env node
'use strict'

const ora = require('ora')
const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')

const initCRA = require('./init')
const cloneTemplate = require('./clone')
const installPackage = require('./install')
const handleError = require('./exit')

initCRA().then(async (projectName) => {
    const spinner = ora('- 清理默认模版')
    spinner.start()
    const directory = path.join(projectName)
    await fs.emptyDir(path.join(directory, 'public'), (error) =>
        handleError(error, spinner)
    )
    await fs.emptyDir(path.join(directory, 'src'), (error) =>
        handleError(error, spinner)
    )
    setTimeout(() => {
        spinner.succeed()
        cloneTemplate(directory)
            .then((templatePath) => installPackage(projectName, templatePath))
            .then(() =>
                console.log(
                    chalk.bgMagenta('CCRC-APP'),
                    chalk.cyan('projectName'),
                    chalk.green('创建完成')
                )
            )
    }, 1000)
})
