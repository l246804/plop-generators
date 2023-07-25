import { installPackage } from '@antfu/install-pkg'
import { getTemplateAnswers, getTemplatePrompts, getTemplateTypes } from './utils/template'
import type { TemplateMetadata } from './types/template'
import { ensureFunction } from '@/utils/fn'
import logger from '@/utils/logger'
import type { GeneratorModule } from '@/types/generator-module'

export interface ConfigGeneratorOptions {
  /**
   * 自动安装依赖时的可选参数
   */
  additionalArgs?: string[]
}

const setup: GeneratorModule<ConfigGeneratorOptions> = (plop, options) => {
  const templates = Object.values(
    import.meta.glob<TemplateMetadata>('./plop-templates/**/metadata.ts', {
      import: 'default',
      eager: true,
    }),
  )

  if (templates.length === 0) return logger.warn('No templates found.')

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
      if (autoInstall) {
        installPackage(ensureFunction(metadata.deps!)(data), {
          dev: true,
          additionalArgs: options?.additionalArgs,
        })
      }

      return ensureFunction(metadata.actions)(data) || []
    },
  })
}

export default setup
