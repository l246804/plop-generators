import type { NodePlopAPI } from 'node-plop'
import { camelCase } from 'lodash-es'
import type { GeneratorModule } from './types/generator-module'
import type { Recordable } from './types/utils'

export * from './generators'

const generators = import.meta.glob<GeneratorModule>('./*-generator/index.ts', {
  eager: true,
  import: 'default',
})

export function setupGenerators(plop: NodePlopAPI, options: Recordable<Recordable> = {}) {
  Object.entries(generators).forEach(([key, fn]) => {
    fn(plop, options?.[camelCase(key.split('/').find((v) => v.endsWith('generator')))] || {})
  })
}
