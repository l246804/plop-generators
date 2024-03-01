import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { defineMetadata } from '../../utils/template'
import { $dir } from '@/utils/path'
import { requiredValidator } from '@/utils/prompt'

export default defineMetadata({
  name: 'package',
  description: 'Package configuration.',
  prompts: [
    {
      type: 'input',
      name: 'account',
      message: 'Github account:',
      validate: requiredValidator,
    },
    {
      type: 'input',
      name: 'username',
      message: 'Username:',
      validate: requiredValidator,
    },
    {
      type: 'confirm',
      name: 'scope',
      message: 'Scope?',
      default: true,
    },
    {
      type: 'input',
      name: 'scopeName',
      message: 'Scope name?',
      when: (answers) => answers.scope,
      validate: requiredValidator,
    },
    {
      type: 'input',
      name: 'name',
      message: 'Package name:',
      validate: requiredValidator,
    },
    {
      type: 'input',
      name: 'description',
      message: 'Package description:',
    },
    {
      type: 'confirm',
      name: 'build',
      message: 'Needs to build?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'commitizen',
      message: 'Commitizen?',
      default: true,
    },
    {
      type: 'list',
      name: 'releaseTool',
      message: 'Select release tool:',
      choices: [
        { checked: true, name: 'ReleaseIt', value: 'releaseIt' },
        { name: 'Changesets', value: 'changesets' },
      ],
      default: 'releaseIt',
    },
  ],
  processAnswer: (data) => {
    data.year = new Date().getFullYear()
    data[data.releaseTool] = true
  },
  deps: (data) => [data.releaseIt && 'release-it', data.changesets && '@changesets/cli'],
  actions: (data) => {
    return [
      {
        type: 'add',
        templateFile: resolve($dir(__dirname), 'default.hbs'),
        path: resolve(cwd(), 'package.json'),
        data,
        force: true,
      },
      {
        type: 'add',
        templateFile: resolve($dir(__dirname), 'license.hbs'),
        path: resolve(cwd(), 'LICENSE'),
        data,
        skipIfExists: true,
      },
      {
        type: 'add',
        templateFile: resolve($dir(__dirname), 'gitignore.hbs'),
        path: resolve(cwd(), '.gitignore'),
        data,
        skipIfExists: true,
      },
    ]
  },
})
