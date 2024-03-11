import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { defineMetadata } from '../../utils/template'
import { $dir } from '@/utils/path'

export default defineMetadata({
  name: 'vite',
  description: 'Vite configuration.',
  prompts: [
    {
      type: 'confirm',
      name: 'umd',
      message: 'Needs umd of format?',
      default: false,
    },
  ],
  deps: ['vite', 'vite-plugin-dts', 'typescript', 'rollup'],
  actions: (data) => {
    return [
      {
        type: 'add',
        templateFile: resolve($dir(__dirname), 'default.hbs'),
        path: resolve(cwd(), 'vite.config.ts'),
        data,
      },
    ]
  },
})
