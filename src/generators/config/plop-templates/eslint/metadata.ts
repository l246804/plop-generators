import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { getPackageInfoSync, isPackageExists } from 'local-pkg'
import { defineMetadata } from '../../utils/template'
import { isVue2 } from '@/utils/vue'

export default defineMetadata({
  name: 'eslint',
  description: 'ESLint configuration.',
  deps: ['eslint', 'eslint-define-config', '@antfu/eslint-config'],
  actions: () => {
    const vueInfo = getPackageInfoSync('vue')
    const data = {
      hasVue: !!vueInfo,
      isVue2: isVue2(vueInfo?.version),
      hasTS: isPackageExists('typescript'),
    }
    return [
      {
        type: 'add',
        templateFile: resolve(__dirname, 'default.hbs'),
        path: resolve(cwd(), '.eslintrc.cjs'),
        data,
      },
    ]
  },
})
