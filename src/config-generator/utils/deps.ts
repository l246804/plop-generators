import type { Recordable } from '@/types/utils'

const DEP_VERSION_MAP: Recordable<string> = {
  '@changesets/cli': '^2',

  husky: '^9',
  '@commitlint/cli': '^18',
  '@commitlint/types': '^18',
  '@commitlint/config-conventional': '^18',

  commitizen: '^4',
  'git-cz': '^4',
  'cz-git': '^1',
  'cz-conventional-changelog': '^3',

  typescript: '^5',

  eslint: '^8',
  'eslint-define-config': '^2',
  '@antfu/eslint-config': '^0',
  prettier: '^3',

  'release-it': '^17',
  '@release-it/conventional-changelog': '^8',

  postcss: '^8',
  'postcss-less': '^6',
  'postcss-scss': '^4',
  'postcss-html': '^1',

  stylelint: '^16',
  'stylelint-config-standard': '^36',
  'stylelint-order': '^6',
  'stylelint-config-property-sort-order-smacss': '^10',
  'stylelint-config-standard-less': '^3',
  'stylelint-config-standard-scss': '^13',
  'stylelint-config-standard-vue': '^1',

  unbuild: '^2',

  vite: '^5',
  'vite-plugin-dts': '^3',
  rollup: '^4',
}

function joinVersion(dep: string) {
  const version = DEP_VERSION_MAP[dep]
  if (dep.indexOf('@') > 0 || !version) return dep
  return `${dep}@${version}`
}

export function mapDeps(deps: string[]) {
  return deps.map(joinVersion)
}
