import { cwd } from 'node:process'
import { resolve } from 'node:path'
import { defineMetadata } from '../../utils/template'
import { $dir } from '@/utils/path'

export default defineMetadata({
  name: 'changesets',
  description: 'Changesets configuration.',
  deps: ['@changesets/cli'],
  actions: () => {
    return [
      {
        type: 'add',
        templateFile: resolve($dir(__dirname), 'default.hbs'),
        path: resolve(cwd(), '.changeset/config.json'),
        skipIfExists: true,
      },
      {
        type: 'add',
        templateFile: resolve($dir(__dirname), 'readme.hbs'),
        path: resolve(cwd(), '.changeset/README.md'),
        skipIfExists: true,
      },
    ]
  },
})
