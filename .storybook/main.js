const path = require('path');

module.exports = {
  stories: [
    '../packages/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    './**/*.stories.mdx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-knobs',
    {
      name: '@storybook/addon-react-native-web',
    },
  ],
  framework: '@storybook/react',
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
      '@storybook/react-native': '@storybook/react',
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
    };
    return config;
  },
};
