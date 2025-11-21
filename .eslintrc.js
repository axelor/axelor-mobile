module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  ignorePatterns: ['__tests__/', 'lib/'],
  rules: {
    'prettier/prettier': 'off',
    '@react-native/no-deep-imports': 'off',
  },
};
