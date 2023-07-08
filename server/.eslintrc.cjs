module.exports = {
  env: {
    es2022: true,
    node: true,
  },
  extends: 'standard-with-typescript',
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'off',
    'comma-dangle': 'off',
    semi: 'off',
  },
};
