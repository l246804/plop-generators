import antfu from '@antfu/eslint-config'

export default antfu({
  javascript: {
    overrides: {
      'unused-imports/no-unused-imports': ['error'],
    },
  },
  stylistic: {
    overrides: {
      'style/space-before-blocks': ['error', 'always'],
      'style/arrow-parens': ['error', 'always'],
    },
  },
})
