module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    '@wemake-services/typescript/recommended',
    '@wemake-services/javascript'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    "@typescript-eslint/naming-convention": "off",
    "consistent-return": "off",
    "no-confusing-arrow": "off",
    "no-unused-vars": "off",
    "id-blacklist": "off",
    "unicorn/no-null": "off",
    "unicorn/consistent-function-scoping": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "promise/prefer-await-to-callbacks": "off",
    "promise/prefer-await-to-then": "off",
    "unicorn/filename-case": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "promise/always-return": "off",
    "no-shadow": "off",
    'space-in-parens': ['error', 'always'],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
