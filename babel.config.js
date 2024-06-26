module.exports = {
  presets: ['module:metro-react-native-babel-preset', '@babel/preset-react'],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-typescript',
      ],
    },
  },
  plugins: [
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanCodes'],
      },
    ],
  ],
};
