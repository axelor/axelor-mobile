module.exports = {
  stories: ['../packages/ui/stories/molecules/*.stories.tsx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-react-native-web'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
      '@storybook/react-native': '@storybook/react',
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
    };

    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules[\\\/]react-native-reanimated/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            'module:metro-react-native-babel-preset',
          ],
          plugins: ['react-native-reanimated/plugin'],
        },
      },
    });

    return config;
  },
};
