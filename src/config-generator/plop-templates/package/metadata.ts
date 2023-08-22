import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { defineMetadata } from '../../utils/template'
import { $dir } from '@/utils/path'
import { requiredValidator } from '@/utils/prompt'

export default defineMetadata({
  name: 'package',
  description: 'Package configuration.',
  deps: ['plop'],
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
  ],
  actions: (data) => {
    return [
      {
        type: 'add',
        templateFile: resolve($dir(__dirname), 'default.hbs'),
        path: resolve(cwd(), 'package.json'),
        data,
        force: true,
      },
    ]
  },
})
