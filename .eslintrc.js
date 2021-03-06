module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': 'off',
    'camelcase': 'off',
    'import/no-mutable-exports': 'off',
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'radix': 'off',
    'linebreak-style': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off'
  //   "import/extensions": [
  //     "error",
  //     "ignorePackages",
  //     {
  //       "js": "never",
  //       "jsx": "never",
  //       "ts": "never",
  //       "tsx": "never"
  //     }
  //  ],
  //  '@typescript-eslint/no-var-requires': 'off'
  },
};
