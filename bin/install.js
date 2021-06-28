'use strict'

const ora = require('ora')
const path = require('path')
const fs = require('fs-extra')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const handleError = require('./exit')

module.exports = async (templatePath, projectName, options) => {
    const spinner = ora('- 安装其他依赖包')
    spinner.start()

    const jsonPath = path.join(templatePath, 'template.json')
    const { template, dependencies, devDependencies } = require(jsonPath)

    const execOptions = { cwd: projectName }

    await exec(getPackagesStr(dependencies, options), execOptions)
        .then(({ error }) => handleError(error, spinner))
        .catch((error) => handleError(error, spinner))

    await exec(getPackagesStr(devDependencies, options, ' -D'), execOptions)
        .then(({ error }) => handleError(error, spinner))
        .catch((error) => handleError(error, spinner))

    await updatePackageJson(template, projectName)

    spinner.succeed()
}

const getPackagesStr = (obj, options, arg = '') =>
    Object.entries(obj).reduce((target, [name, version]) => {
        target += ` ${name}`
        if (options.specified) target += `@${version}`
        return target
    }, `yarn add${arg}`)

const updatePackageJson = async (template, projectName) => {
    const packagePath = path.join(projectName, 'package.json')
    const packageJson = await fs.readJson(packagePath)
    let result = {}
    const continueArr = ['scripts', 'devDependencies']
    for (let key in packageJson) {
        if (continueArr.includes(key)) continue
        if (key === 'dependencies') {
            const { dependencies, devDependencies } = packageJson
            result = { ...result, ...template, dependencies, devDependencies }
        } else result[key] = packageJson[key]
    }
    await fs.writeFile(packagePath, JSON.stringify(result, null, 2))
}
