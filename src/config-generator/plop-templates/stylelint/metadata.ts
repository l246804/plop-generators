import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { defineMetadata } from '../../utils/template'
import { $dir } from '@/utils/path'
import { getVueInfo } from '@/utils/vue'

export default defineMetadata({
  name: 'stylelint',
  description: 'Stylelint configuration.',
  prompts: [
    {
      type: 'confirm',
      name: 'order',
      message: 'Order?',
      default: true,
    },
    {
      type: 'list',
      name: 'lang',
      message: 'Select style lang:',
      choices: [
        { checked: true, name: 'css', value: 'css' },
        { name: 'less', value: 'less' },
        { name: 'scss', value: 'scss' },
      ],
      default: 'css',
    },
  ],
  deps: (data) => [
    'postcss',
    'stylelint',
    'stylelint-config-recommended',
    'stylelint-config-standard',

    data.order && 'stylelint-order',

    ...(data.lang !== 'css'
      ? [
          `postcss-${data.lang}`,
          `stylelint-config-recommended-${data.lang}`,
          `stylelint-config-standard-${data.lang}`,
        ]
      : []),

    ...(getVueInfo()
      ? ['postcss-html', 'stylelint-config-recommended-vue', 'stylelint-config-standard-vue']
      : []),
  ],
  actions: (answer) => {
    const data = {
      vue: !!getVueInfo(),
      order: !!answer.order,
      less: answer.lang === 'less',
      scss: answer.lang === 'scss',
    }
    return [
      {
        type: 'add',
        templateFile: resolve($dir(__dirname), 'default.hbs'),
        path: resolve(cwd(), '.stylelintrc.cjs'),
        data,
      },
    ]
  },
})
