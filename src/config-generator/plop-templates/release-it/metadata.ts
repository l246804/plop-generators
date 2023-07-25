import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { defineMetadata } from '../../utils/template'

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
    {
      type: 'confirm',
      name: 'monorepo',
      message: 'Monorepo?',
      default: false,
    },
  ],
  deps: (answers) => [
    'release-it',
    answers.changelog && '@release-it/conventional-changelog',
    answers.monorepo && '@release-it/bumper',
  ],
  actions: (data) => [
    {
      type: 'add',
      templateFile: resolve(__dirname, 'default.hbs'),
      path: resolve(cwd(), '.release-it.json'),
      data,
    },
  ],
})
