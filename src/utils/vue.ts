import { getPackageInfoSync } from 'local-pkg'

export function getVueInfo() {
  return getPackageInfoSync('vue')
}

export function isVue2(version) {
  return Number.parseInt(version) === 2
}
