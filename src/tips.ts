import chalk from 'chalk'
import type { OptionValues } from 'commander'

const showTips = (name: string, options: OptionValues) => {
  console.log(
    chalk.bgMagenta('CCRC-APP'),
    chalk.bgCyan(name),
    chalk.green('创建完毕√'),
  )

  const cd = chalk.magenta('cd ') + chalk.cyan(name) + chalk.magenta(';')
  const manager = chalk.cyan(options.manager)

  if (options.noinstall) {
    return console.log(
      chalk.yellow('安装依赖:'),
      cd,
      manager,
      chalk.magenta('install'),
    )
  }

  console.log(chalk.yellow('检查更新:'), cd, manager, chalk.magenta('outdated'))
  console.log(chalk.yellow('快速开始:'), cd, manager, chalk.magenta('dev'))
}

export default showTips
