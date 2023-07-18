import { resolve } from 'node:path'
import { defineBuildConfig } from 'unbuild'
import type { BuildEntry } from 'unbuild'

function createEntry(format: 'esm' | 'cjs') {
  return {
    builder: 'mkdist',
    input: 'src',
    format,
    ext: format === 'esm' ? 'mjs' : 'cjs',
  } as BuildEntry
}

export default defineBuildConfig({
  entries: [createEntry('esm'), createEntry('cjs')],
  outDir: 'dist',
  declaration: true,
  clean: true,
  alias: {
    '@': resolve('./src'),
  },
  failOnWarn: false,
})
