import { extname } from 'node:path'
import { globSync } from 'fast-glob'
import type { PromptQuestion } from 'node-plop'
import type { TemplateMetadata } from '../types/template'
import { resolve } from './path'
import { requireModule } from '@/utils/module'

export function defineMetadata(metaData: TemplateMetadata) {
  return metaData
}

export function readMetadata() {
  const metadata = globSync(`**/metadata${extname(__filename)}`, {
    cwd: resolve('plop-templates'),
    deep: 2,
    onlyFiles: true,
    absolute: true,
  })
  return metadata.map<TemplateMetadata>((path) => requireModule(path))
}

export function getTemplateTypes(metadata: TemplateMetadata[]) {
  return metadata.map(({ name, description }) => ({ name: description || name, value: name }))
}

export function getTemplatePrompts(metadata: TemplateMetadata[]) {
  return metadata.reduce(
    (arr, item) =>
      arr.concat(
        (item.prompts || []).map((_item) => ({
          ..._item,
          name: `${item.name}.${_item.name}`,
          when: (answer) => answer.type === item.name,
        })),
      ),
    [] as PromptQuestion[],
  )
}

export function getTemplateAnswers(type: string, answer) {
  return Object.assign({}, answer?.[type])
}
