module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules', '*.test.jsx',],
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
    // Enforce kebab-case for filenames
    'filenames/match-regex': ['error', '^[a-z0-9-]+$', true],
    // Enforce semicolons at the end of statements
    'semi': ['error', 'always'],
    // Enforce Prop-Types validation rule
    'react/prop-types': 'error',
    // Enforce react import rule
    'react/react-in-jsx-scope': 'error',
    // Enforce no-unused-vars rule
    'no-unused-vars': 'off',
  },
}
