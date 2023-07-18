import { readdirSync, statSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { GENERATORS_DIR, GENERATORS_INDEX_FILE } from '../internal/constant'

const generators = readdirSync(GENERATORS_DIR).filter((name) =>
  statSync(resolve(GENERATORS_DIR, name)).isDirectory())

writeFileSync(
  GENERATORS_INDEX_FILE,
  `\
${generators.map((name) => `export * from './${name}'`).join('\n')}
`,
)
