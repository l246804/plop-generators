import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { getPackageInfoSync } from 'local-pkg'
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
  ],
  actions: (answers) => {
    const vueInfo = getPackageInfoSync('vue')
    const data = {
      ...answers,
      hasVue: !!vueInfo,
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
