import type { Actions, PromptQuestion } from 'node-plop'
import type { Fn } from '@/types/utils'

export interface TemplateMetadata {
  name: string
  description?: string
  deps?: string[] | Fn<[any], string[]>
  prompts?: PromptQuestion[]
  actions: Actions
}
