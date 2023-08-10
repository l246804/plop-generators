import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { isPackageExists } from 'local-pkg'
import { defineMetadata } from '../../utils/template'
import { getVueInfo, isVue2 } from '@/utils/vue'
import { $dir } from '@/utils/path'

export default defineMetadata({
  name: 'eslint',
  description: 'ESLint configuration.',
  deps: ['eslint', 'eslint-define-config', '@antfu/eslint-config'],
  actions: () => {
    const vueInfo = getVueInfo()
    const data = {
      hasVue: !!vueInfo,
      isVue2: isVue2(vueInfo?.version),
      hasTS: isPackageExists('typescript'),
    }
    return [
      {
        type: 'add',
        templateFile: resolve($dir(__dirname), 'default.hbs'),
        path: resolve(cwd(), '.eslintrc.cjs'),
        data,
      },
    ]
  },
})
