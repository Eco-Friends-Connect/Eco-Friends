module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh','filenames'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Enforce camelCase for user-defined JSX components
    'camelcase': 'error',
    // Enforce PascalCase for user-defined JSX components
    'react/jsx-pascal-case': 'error',
    // Enforce lowercase filenames
    'filenames/match-regex': [2, '[a-z][a-zA-Z0-9]+$', true],
    // Enforce 2-space indentation
    'indent': ['error', 2],
    // Enforce single quotes for strings
    'quotes': ['error', 'single'],
    // Enforce semicolons at the end of statements
    'semi': ['error', 'always'],
  },
}
