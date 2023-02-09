import fs from 'fs-extra'
import type { Ora } from 'ora'
import path from 'path'

import * as utils from './utils'

const cloneTmpl = async (name: string, spinner: Ora) => {
  const directory = path.join(name)
  const handleErr = (error) => {
    utils.handleErr(error, spinner)
  }
  await Promise.all([
    fs.emptyDir(path.join(directory, 'public'), handleErr),
    fs.emptyDir(path.join(directory, 'src'), handleErr),
  ])
  spinner.succeed()
}

export default cloneTmpl
