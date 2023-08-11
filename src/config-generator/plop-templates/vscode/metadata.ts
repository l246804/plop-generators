import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { defineMetadata } from '../../utils/template'
import { $dir } from '@/utils/path'
import { getVueInfo } from '@/utils/vue'

export default defineMetadata({
  name: 'vscode',
  description: 'VSCode configuration.',
  prompts: [
    {
      name: 'purpose',
      type: 'list',
      message: 'Select template purpose:',
      choices: [{ name: 'Frontend configuration.', value: 'frontend' }],
    },
    {
      name: 'stylelint',
      type: 'confirm',
      message: 'Stylelint?',
      default: true,
      when: (answers) => answers?.purpose === 'frontend',
    },
  ],
  actions: (answers) => {
    const data = {
      ...answers,
      vue: !!getVueInfo(),
      stylelint: !!answers?.stylelint,
    }
    return [
      {
        type: 'add',
        templateFile: resolve($dir(__dirname), '{{purpose}}/extensions.hbs'),
        path: resolve(cwd(), '.vscode/extensions.json'),
        data,
        skipIfExists: true,
      },
      {
        type: 'add',
        templateFile: resolve($dir(__dirname), '{{purpose}}/settings.hbs'),
        path: resolve(cwd(), '.vscode/settings.json'),
        data,
      },
    ]
  },
})
