import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const projRoot = resolve(__dirname, '..')

export const srcDir = resolve(projRoot, 'src')
export const distDir = resolve(projRoot, 'dist')

export const entryFile = resolve(srcDir, 'index.ts')
export const generatorsFile = resolve(srcDir, 'generators.ts')
