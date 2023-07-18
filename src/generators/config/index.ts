import type { NodePlopAPI } from 'plop'
import { installPackage } from '@antfu/install-pkg'
import { getTemplateAnswers, getTemplatePrompts, getTemplateTypes, readMetadata } from './utils/template'
import { ensureFunction } from './utils/fn'
import { setupFileTreeSelectionPrompt } from './utils/fileTreeSelectionPrompt'
import logger from '@/utils/logger'

export function setupGenerator(plop: NodePlopAPI) {
  const templates = readMetadata()

  if (templates.length === 0) return logger.warn('No templates found.')

  setupFileTreeSelectionPrompt(plop)

  plop.setGenerator('config-generator', {
    description: 'Generate configuration file.',
    prompts: [
      {
        name: 'type',
        message: 'Select template configuration type:',
        type: 'list',
        choices: getTemplateTypes(templates),
      },
      ...getTemplatePrompts(templates),
      {
        name: 'autoInstall',
        message: 'Automatically install dependencies?',
        type: 'confirm',
        default: false,
        when: (answers) => {
          const template = templates.find(({ name }) => name === answers.type)
          if (!template?.deps) return false
          const data = getTemplateAnswers(answers.type, answers)
          return ensureFunction(template.deps)(data).length > 0
        },
      },
    ],
    actions: (answers = {}) => {
      const { type, autoInstall } = answers
      const metadata = templates.find(({ name }) => name === type)
      if (!metadata) return []

      const data = getTemplateAnswers(type, answers)
      if (autoInstall) installPackage(ensureFunction(metadata.deps!)(data), { dev: true })

      return ensureFunction(metadata.actions)(data) || []
    },
  })
}
