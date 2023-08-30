import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { defineMetadata } from '../../utils/template'
import { $dir } from '@/utils/path'

export default defineMetadata({
  name: 'unbuild',
  description: 'Unbuild configuration.',
  prompts: [
    {
      type: 'list',
      name: 'builder',
      choices: [
        { checked: true, name: 'src/index', value: 'rollup' },
        { name: 'src', value: 'mkdist' },
      ],
      default: 'rollup',
    },
  ],
  deps: ['unbuild', 'typescript'],
  actions: (data) => {
    data[data.builder] = true
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
