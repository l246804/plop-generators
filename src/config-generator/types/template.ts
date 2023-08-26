import type { ActionType, PromptQuestion } from 'node-plop'
import type { Fn, Recordable } from '@/types/utils'

export interface TemplateMetadata {
  name: string
  description?: string
  deps?: string[] | Fn<[any], string[]>
  additionalArgs?: string[]
  prompts?: PromptQuestion[]
  actions?: ((data: Recordable) => ActionType[]) | ActionType[]
  processAnswer?: (data: Recordable) => void

  onInstalled?: Fn<[any]>
}
