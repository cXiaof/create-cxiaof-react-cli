import childProcess from 'child_process'
import type { OptionValues } from 'commander'
import ora from 'ora'
import util from 'util'

import * as utils from './utils'

const exec = util.promisify(childProcess.exec)

const installDeps = async (name: string, options: OptionValues) => {
  const content = `- 正在安装依赖`
  const spinner = ora(content).start()

  const cmd = `${options.manager} install`
  const execOptions = { cwd: name }
  await exec(cmd, execOptions).catch((error) => utils.handleErr(error, spinner))

  spinner.succeed()
}

export default installDeps
