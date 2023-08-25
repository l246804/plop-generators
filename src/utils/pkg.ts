import { getPackageInfoSync } from 'local-pkg'

export function isVue2() {
  const version = getPackageInfoSync('vue')?.version
  return !!version && Number.parseInt(version) === 2
}
