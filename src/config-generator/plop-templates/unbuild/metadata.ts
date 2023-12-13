import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { defineMetadata } from '../../utils/template'
import { $dir } from '@/utils/path'

export default defineMetadata({
  name: 'unbuild',
  description: 'Unbuild configuration.',
  prompts: [
    {
      type: 'confirm',
      name: 'umd',
      message: 'Needs umd of format?',
      default: false,
    },
  ],
  deps: ['unbuild', 'typescript'],
  actions: (data) => {
    return [
      {
        type: 'add',
        templateFile: resolve($dir(__dirname), 'default.hbs'),
        path: resolve(cwd(), 'build.config.ts'),
        data,
      },
    ]
  },
})
