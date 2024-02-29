import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { execa } from 'execa'
import fs from 'fs-extra'
import { defineMetadata } from '../../utils/template'
import { $dir } from '@/utils/path'
import logger from '@/utils/logger'
import { execaOpts } from '@/utils/execa'

export default defineMetadata({
  name: 'commitlint',
  description: 'Commitlint configuration.',
  deps: ['husky', '@commitlint/cli', '@commitlint/types', '@commitlint/config-conventional'],
  prompts: [
    {
      type: 'confirm',
      name: 'commitizen',
      message: 'Commitizen?',
      default: true,
    },
  ],
  onInstalled: () => {
    return Promise.resolve()
      .then(() => execa('husky', ['init'], execaOpts))
      .then(() =>
        execa(
          'echo',
          ['npx --no-install commitlint --edit $1', '>', '.husky/commit-msg'],
          execaOpts,
        ))
  },
  actions: (answers) => {
    const data = {
      hasCzConfig: false,
      enums: '',
      maxHeaderLength: '',
    }

    const czrcFile = resolve(cwd(), '.czrc')
    const pkgFile = resolve(cwd(), 'package.json')
    const hasCzrc = fs.existsSync(czrcFile)

    if (answers.commitizen && (hasCzrc || fs.existsSync(pkgFile))) {
      const file = hasCzrc ? czrcFile : pkgFile
      const errorFile = hasCzrc ? '.czrc' : 'package.json:commitizen'
      const json = fs.readFileSync(file, { encoding: 'utf-8' })

      try {
        const obj = JSON.parse(json) || {}
        const path = obj.path || obj.commitizen?.path || ''
        if (!path) throw new Error(`The path in "${errorFile}" must exist!`)
        if (path.includes('git-cz')) {
          data.enums = 'list'
          data.maxHeaderLength = 'maxMessageLength'
        }
        else if (path.includes('cz-git')) {
          data.enums = 'type.map(({ value }) => value)'
          data.maxHeaderLength = 'maxHeaderLength'
        }
        data.hasCzConfig = !!data.enums
      }
      catch (e) {
        logger.warn(`Parsing "${errorFile}" failed!`)
      }
    }

    return [
      {
        type: 'add',
        templateFile: resolve($dir(__dirname), 'default.hbs'),
        path: resolve(cwd(), 'commitlint.config.cjs'),
        data,
      },
    ]
  },
})
