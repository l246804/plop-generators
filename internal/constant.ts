import { resolve } from 'node:path'
import { cwd } from 'node:process'

export const CWD = cwd()

export const GENERATORS_DIR = resolve(CWD, 'src/generators')

export const GENERATORS_INDEX_FILE = resolve(GENERATORS_DIR, 'index.ts')
