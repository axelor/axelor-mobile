module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./jest/setup.js'],
  setupFilesAfterEnv: ['./jest/setup-tests.js'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|(jest-)?react-native|react-native-toast-message|react-clone-referenced-element|@react-native-community|rollbar-react-native|@fontawesome|@react-native|@react-navigation|react-native-pell-rich-editor|react-native-vector-icons/FontAwesome|react-native-vector-icons/FontAwesome5)/|react-native-webview|react-native-render-html)',
  ],
};
