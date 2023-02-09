import chalk from 'chalk'
import childProcess from 'child_process'
import type { OptionValues } from 'commander'
import ora from 'ora'
import util from 'util'

import * as utils from './utils'

const exec = util.promisify(childProcess.exec)

const initVite = async (name: string, options: OptionValues) => {
  const content = chalk.white('- 拉取模板') + ' ' + chalk.cyan(options.template)
  const spinner = ora(content).start()

  const cmd = `${options.manager} create vite ${name} --template ${options.template}`
  await exec(cmd).catch((error) => utils.handleErr(error, spinner))

  return spinner
}

export default initVite
