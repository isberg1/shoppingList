module.exports = {
  //extends: 'eslint:all',
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  parserOptions: {ecmaVersion: 6},
  plugins: ['@typescript-eslint'],
  env: {
    jest: true,
  },
  rules: {
    semi: 'error',
  },
};
