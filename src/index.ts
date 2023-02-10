#! /usr/bin/env node

import chalk from 'chalk'
import { Command } from 'commander'

import cloneTmpl from './clone'
import installDeps from './install'
import initVite from './vite'

import { version } from '../package.json'

const program = new Command()

program.name('ccrc').version(version)

program
  .arguments('<projectName>')
  .option('-t, --template <preset>', 'Vite模板', 'react-ts')
  .option('-m, --manager <management>', '包管理器', 'pnpm')
  .option('-map, --map', '创建为地图项目')

program.parse()

const name = program.args[0]
const options = program.opts()

console.log(chalk.yellow('正在创建项目'), chalk.bgMagenta(name))

initVite(name, options).then(async (spinner) => {
  if (options.template.startsWith('react')) {
    await cloneTmpl(name, options, spinner)
  }
  await installDeps(name, options)
})
