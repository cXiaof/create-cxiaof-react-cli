import type { OptionValues } from 'commander'
import fs from 'fs-extra'
import type { Ora } from 'ora'
import path from 'path'

import * as utils from './utils'

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
    fs.copy(path.join(ccrcTmplPath, folderBase), directory, handleErr),
    fs.copy(path.join(ccrcTmplPath, folderChoose), directory, handleErr),
  ])

  const pathConfigJS = path.join(ccrcTmplPath, 'jsconfig.json')
  const pathConfigTS = path.join(directory, 'tsconfig.json')
  if (isTS) {
    const [jsconfigJSON, tsconfigJSON] = await Promise.all([
      fs.readJson(pathConfigJS),
      fs.readJson(pathConfigTS),
    ])
    tsconfigJSON.compilerOptions = {
      ...tsconfigJSON.compilerOptions,
      ...jsconfigJSON.compilerOptions,
    }
    await fs.writeFile(pathConfigTS, JSON.stringify(tsconfigJSON))
  } else {
    await fs.copy(pathConfigJS, directory, handleErr)
  }
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

  await fs.writeFile(pathPkgJSON, JSON.stringify(prjPkgJSON))
}

export default cloneTmpl
