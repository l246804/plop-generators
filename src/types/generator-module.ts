import type { NodePlopAPI } from 'node-plop'
import type { Recordable } from './utils'

export type GeneratorModule = <T extends Recordable = Recordable>(
  plop: NodePlopAPI,
  options?: T,
) => void
