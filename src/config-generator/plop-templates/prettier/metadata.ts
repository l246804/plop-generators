import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { defineMetadata } from '../../utils/template'
import { $dir } from '@/utils/path'

export default defineMetadata({
  name: 'prettier',
  description: 'Prettier configuration.',
  deps: ['prettier'],
  actions: [
    {
      type: 'add',
      templateFile: resolve($dir(__dirname), 'default.hbs'),
      path: resolve(cwd(), '.prettierrc'),
    },
  ],
})
