import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { defineMetadata } from '../../utils/template'
import { $dir } from '@/utils/path'

export default defineMetadata({
  name: 'release-it',
  description: 'Release-It configuration.',
  prompts: [
    {
      type: 'confirm',
      name: 'changelog',
      message: 'Changelog?',
      default: true,
    },
  ],
  deps: (answers) => [
    'release-it',
    answers.changelog && '@release-it/conventional-changelog',
  ],
  actions: (data) => [
    {
      type: 'add',
      templateFile: resolve($dir(__dirname), 'default.hbs'),
      path: resolve(cwd(), '.release-it.json'),
      data,
    },
  ],
})
