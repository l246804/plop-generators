import type { ExternalOption, OutputOptions } from 'rollup'
import { keys, uniq } from 'lodash-es'
import pkg from '../package.json'
import { cjsExt, esmExt } from './constants'
import { srcDir } from './paths'

export function genExternals() {
  return uniq([
    /^node(:.+)?$/,
    ...keys(pkg.peerDependencies),
    ...keys(pkg.dependencies),
  ]) as ExternalOption
}

export function genOutput(format: 'cjs' | 'esm') {
  return {
    format,
    preserveModules: true,
    preserveModulesRoot: srcDir,
    entryFileNames: (info) =>
      `${/node_modules/.test(info.name) ? info.name.split('node_modules/').at(-1)! : '[name]'}${
        format === 'esm' ? esmExt : cjsExt
      }`,
  } as OutputOptions
}
