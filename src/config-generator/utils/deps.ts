import type { Recordable } from '@/types/utils'

const DEP_VERSION_MAP: Recordable<string> = {
  '@changesets/cli': '^2',

  husky: '^8',
  '@commitlint/cli': '^17',
  '@commitlint/types': '^17',
  '@commitlint/config-conventional': '^17',

  commitizen: '^4',
  'git-cz': '^4',
  'cz-git': '^1',
  'cz-conventional-changelog': '^3',

  typescript: '^5',

  eslint: '^8',
  'eslint-define-config': '^1',
  '@antfu/eslint-config': '^0',
  prettier: '^3',

  'release-it': '^16',
  '@release-it/conventional-changelog': '^7',

  postcss: '^8',
  'postcss-less': '^6',
  'postcss-scss': '^4',
  'postcss-html': '^1',

  stylelint: '^15',
  'stylelint-config-standard': '^34',
  'stylelint-order': '^6',
  'stylelint-config-property-sort-order-smacss': '^9',
  'stylelint-config-standard-less': '^2',
  'stylelint-config-standard-scss': '^11',
  'stylelint-config-standard-vue': '^1',

  unbuild: '^2',
}

function joinVersion(dep: string) {
  const version = DEP_VERSION_MAP[dep]
  if (dep.indexOf('@') > 0 || !version) return dep
  return `${dep}@${version}`
}

export function mapDeps(deps: string[]) {
  return deps.map(joinVersion)
}
