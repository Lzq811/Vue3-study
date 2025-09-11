module.exports = {
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  overrides: [
    {
      files: ['src/views/index.vue', 'src/views/**/index.vue'],
      rules: {
        'vue/multi-word-component-names': 'off'
      }
    }
  ]
}
