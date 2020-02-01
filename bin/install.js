'use strict'

const ora = require('ora')
const path = require('path')
const fs = require('fs-extra')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const handleError = require('./exit')

module.exports = async (projectName, templatePath) => {
    const spinner = ora('- 安装其他依赖包')
    spinner.start()
    const { template, dependencies, devDependencies } = require(path.join(
        templatePath,
        'template.json'
    ))

    const packagePath = path.join(projectName, 'package.json')
    let packageJson = await fs.readJson(packagePath)
    packageJson = { ...packageJson, ...template }
    await fs.writeFile(packagePath, JSON.stringify(packageJson, null, 2))

    const options = { cwd: projectName }
    await exec(getPackagesStr(dependencies), options)
        .then(({ error }) => handleError(error, spinner))
        .catch((error) => handleError(error, spinner))
    await exec(getPackagesStr(devDependencies, ' -D'), options)
        .then(({ error }) => handleError(error, spinner))
        .catch((error) => handleError(error, spinner))

    spinner.succeed()
}

const getPackagesStr = (obj, arg = '') =>
    Object.keys(obj).reduce((target, name) => {
        target += ` ${name}`
        return target
    }, `yarn add${arg}`)
