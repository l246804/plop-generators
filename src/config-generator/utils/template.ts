import type { PromptQuestion } from 'node-plop'
import type { TemplateMetadata } from '../types/template'

export function defineMetadata(metaData: TemplateMetadata) {
  return metaData
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
