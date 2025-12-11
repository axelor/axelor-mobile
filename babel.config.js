module.exports = {
  presets: ['module:@react-native/babel-preset', '@babel/preset-react'],
  env: {test: {presets: ['@babel/preset-typescript']}},
  plugins: [
    ['react-native-worklets/plugin', {globals: ['__scanCodes']}],
    ['@babel/plugin-transform-private-methods', {loose: true}],
    ['@babel/plugin-transform-class-properties', {loose: true}],
    ['@babel/plugin-transform-private-property-in-object', {loose: true}],
  ],
};
