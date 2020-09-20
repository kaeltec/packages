module.exports = {
  root: true,
  extends: '@hitechline/eslint-config-node',
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        alphabetize: { order: 'asc', ignoreCase: true },
        groups: [
          ['module', '/^@kaelbot/'],
          ['parent', 'sibling', 'index'],
        ],
      },
    ],
  },
};
