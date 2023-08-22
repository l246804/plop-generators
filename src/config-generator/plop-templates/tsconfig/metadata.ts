import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { defineMetadata } from '../../utils/template'
import { $dir } from '@/utils/path'

export default defineMetadata({
  name: 'tsconfig',
  description: 'Simple configuration of typescript.',
  deps: (answers) => ['typescript', answers.node && '@types/node'],
  prompts: [
    {
      name: 'node',
      type: 'confirm',
      message: 'Node?',
      default: true,
    },
  ],
  actions: (data) => [
    {
      type: 'add',
      templateFile: resolve($dir(__dirname), 'default.hbs'),
      path: resolve(cwd(), 'tsconfig.json'),
      data,
    },
  ],
})
