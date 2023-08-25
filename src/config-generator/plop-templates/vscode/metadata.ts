import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { isPackageExists } from 'local-pkg'
import { defineMetadata } from '../../utils/template'
import { $dir } from '@/utils/path'

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
      name: 'vue',
      type: 'confirm',
      message: 'Vue?',
      default: false,
      when: (answers) => answers.purpose === 'frontend' && !isPackageExists('vue'),
    },
    {
      name: 'stylelint',
      type: 'confirm',
      message: 'Stylelint?',
      default: false,
      when: (answers) => answers.purpose === 'frontend' && !isPackageExists('stylelint'),
    },
  ],
  actions: (answers) => {
    const data = {
      ...answers,
      vue: !!answers.vue,
      stylelint: !!answers.stylelint,
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
