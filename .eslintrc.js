module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-console': 'off',
    'no-alert': 'off',
  },
};
