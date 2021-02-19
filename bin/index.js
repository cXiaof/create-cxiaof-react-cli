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

initCRA().then(async ([projectName, useTS]) => {
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
        cloneTemplate(directory, useTS)
            .then((templatePath) => installPackage(projectName, templatePath))
            .then(() => {
                console.log(
                    chalk.bgMagenta('CCRC-APP'),
                    chalk.green('创建完毕√')
                )
                console.log(
                    chalk.yellow('检查更新:'),
                    chalk.magenta('cd'),
                    chalk.cyan(projectName),
                    chalk.magenta('&& yarn outdated')
                )
                console.log(
                    chalk.yellow('快速开始:'),
                    chalk.magenta('cd'),
                    chalk.cyan(projectName),
                    chalk.magenta('&& yarn s')
                )
            })
    }, 1000)
})
