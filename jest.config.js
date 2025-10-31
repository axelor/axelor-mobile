const {modulePackageNameMapping} = require('./axelor-module-name-mapper');

module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./jest/setup-env.js', './jest/setup-mocks.js'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|(jest-)?react-native|react-native-safe-area-context|react-native-toast-message|react-native-gesture-handler|react-clone-referenced-element|@react-native-community|rollbar-react-native|@react-native|@react-navigation|react-native-drawer-layout|react-native-pell-rich-editor|react-native-contacts|react-native-webview))/',
  ],
  moduleNameMapper: modulePackageNameMapping,
  modulePathIgnorePatterns: ['__tests__/tools'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
