import type { OptionValues } from 'commander'
import type { ObjectEncodingOptions } from 'fs'
import fs from 'fs-extra'
import fsp from 'fs/promises'
import type { Ora } from 'ora'
import path from 'path'

import * as utils from './utils'

const encodingOpts: ObjectEncodingOptions = { encoding: 'utf-8' }
const ccrcTmplPath = path.join(__dirname, 'ccrc-template')

const cloneTmpl = async (name: string, options: OptionValues, spinner: Ora) => {
  const directory = path.join(name)
  const handleErr = (error) => {
    utils.handleErr(error, spinner)
  }
  await cleanTmplVite(directory, handleErr)
  await Promise.all([
    copyTmplCCRC(directory, options, handleErr),
    mergeCCRCPkgJSON(name),
  ])
  spinner.succeed()
}

const cleanTmplVite = async (
  directory: string,
  handleErr: (error: any) => void,
) => {
  await Promise.all([
    fs.emptyDir(path.join(directory, 'public'), handleErr),
    fs.emptyDir(path.join(directory, 'src'), handleErr),
  ])
}

const copyTmplCCRC = async (
  directory: string,
  options: OptionValues,
  handleErr: (error: any) => void,
) => {
  const folderBase = 'template'
  const isTS = options.template.endsWith('-ts')
  const folderChoose = folderBase + (isTS ? '-ts' : '-js')
  await Promise.all([
    improveHTML(directory),
    fs.copy(path.join(ccrcTmplPath, folderBase), directory, handleErr),
    fs.copy(path.join(ccrcTmplPath, folderChoose), directory, handleErr),
    setAlias(directory, options),
  ])
}

const improveHTML = async (directory: string) => {
  const pathHTML = path.join(directory, 'index.html')
  const result = (await fsp.readFile(pathHTML, encodingOpts)) as string
  const dataStr = result.replace(
    /<html[\s\S]*<body>/,
    `<html lang="zh-cmn-Hans">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="author" content="cXiaof" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>CCRC-APP</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>`,
  )
  await fsp.writeFile(pathHTML, dataStr, encodingOpts)
}

const setAlias = async (directory: string, options: OptionValues) => {
  const isTS = options.template.endsWith('-ts')
  const pathConfigTmpl = path.join(ccrcTmplPath, 'jsconfig.json')
  if (isTS) {
    const pathConfigTS = path.join(directory, 'tsconfig.json')
    const [tmplConfigJSON, tsConfigJSON] = await Promise.all([
      fs.readJson(pathConfigTmpl),
      fs.readJson(pathConfigTS),
    ])
    tsConfigJSON.compilerOptions = {
      ...tsConfigJSON.compilerOptions,
      ...tmplConfigJSON.compilerOptions,
    }
    await fsp.writeFile(pathConfigTS, JSON.stringify(tsConfigJSON, null, 2))
  } else {
    const pathConfigJS = path.join(directory, 'jsconfig.json')
    await fsp.copyFile(pathConfigTmpl, pathConfigJS)
  }
  const configFileName = `vite.config.${isTS ? 'ts' : 'js'}`
  const pathConfigVite = path.join(directory, configFileName)
  const result = await fsp.readFile(pathConfigVite, encodingOpts)
  const dataStr =
    `import path from 'path'
` +
    result.slice(0, -3) +
    `resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
`
  await fsp.writeFile(pathConfigVite, dataStr, encodingOpts)
}

const mergeCCRCPkgJSON = async (name: string) => {
  const pathPkgJSON = path.join(name, 'package.json')
  const pathTmplJSON = path.join(ccrcTmplPath, 'template.json')
  const [prjPkgJSON, ccrcPkgJSON] = await Promise.all([
    fs.readJson(pathPkgJSON),
    fs.readJson(pathTmplJSON),
  ])
  const { template, dependencies, devDependencies } = ccrcPkgJSON

  for (const key in template) {
    prjPkgJSON[key] = template[key]
  }
  prjPkgJSON.dependencies = { ...prjPkgJSON.dependencies, ...dependencies }
  prjPkgJSON.devDependencies = {
    ...prjPkgJSON.devDependencies,
    ...devDependencies,
  }

  await fs.writeFile(pathPkgJSON, JSON.stringify(prjPkgJSON, null, 2))
}

export default cloneTmpl
