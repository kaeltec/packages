module.exports = {
  rules: {
    'camelcase': 'off',
    'max-classes-per-file': 'off',

    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        alphabetize: { order: 'asc', ignoreCase: true },
        groups: [
          ['module', '/^@kaelbot/'],
          '//connections/',
          '//schemas/',
          '//utils/',
          ['parent', 'sibling', 'index'],
        ],
      },
    ],
  },
};
