import { resolve } from 'node:path'
import { cwd } from 'node:process'
import type { Actions } from 'node-plop'
import { defineMetadata } from '../../utils/template'
import { $dir } from '@/utils/path'

export default defineMetadata({
  name: 'commitizen',
  description: 'Commitizen configuration.',
  prompts: [
    {
      type: 'list',
      name: 'adaptor',
      message: 'Select adaptor:',
      choices: [
        { checked: true, value: 'git-cz', name: 'git-cz' },
        { value: 'cz-git', name: 'cz-git' },
        { value: 'cz-conventional-changelog', name: 'cz-conventional-changelog' },
      ],
      default: 'git-cz',
    },
  ],
  deps: (answers) => ['commitizen', answers.adaptor],
  actions: (data) => {
    const actions: Actions = [
      {
        type: 'add',
        templateFile: resolve($dir(__dirname), 'adaptor.hbs'),
        path: resolve(cwd(), '.czrc'),
        data: {
          ...(data || {}),
          czGit: data?.adaptor === 'cz-git',
          gitCz: data?.adaptor === 'git-cz',
        },
        force: true,
      },
    ]
    switch (data?.adaptor) {
      case 'git-cz':
        actions.push({
          type: 'add',
          templateFile: resolve($dir(__dirname), 'changelog.hbs'),
          path: resolve(cwd(), 'changelog.config.cjs'),
        })
        break
      case 'cz-git':
        actions.push({
          type: 'add',
          templateFile: resolve($dir(__dirname), 'cz.config.hbs'),
          path: resolve(cwd(), 'cz.config.cjs'),
        })
        break
    }
    return actions
  },
})
