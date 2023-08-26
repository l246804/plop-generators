import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { isPackageExists } from 'local-pkg'
import { defineMetadata } from '../../utils/template'
import { isVue2 } from '@/utils/pkg'
import { $dir } from '@/utils/path'

export default defineMetadata({
  name: 'eslint',
  description: 'ESLint configuration.',
  deps: (answers) => [
    'eslint',
    'eslint-define-config',
    '@antfu/eslint-config',
    answers.ts && 'typescript',
  ],
  prompts: [
    {
      name: 'ts',
      type: 'confirm',
      message: 'Typescript?',
      default: true,
      when: () => !isPackageExists('typescript'),
    },
    {
      name: 'vue',
      type: 'confirm',
      message: 'Vue?',
      default: false,
      when: () => !isPackageExists('vue'),
    },
  ],
  processAnswer: (data) => {
    data.ts ??= true
    data.vue ??= true
  },
  actions: (data) => {
    data.vue2 = isVue2()
    return [
      {
        type: 'add',
        templateFile: resolve($dir(__dirname), 'default.hbs'),
        path: resolve(cwd(), '.eslintrc.cjs'),
        data,
      },
    ]
  },
})
