const path = require('path');

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../packages/**/*.stories.@(js|jsx|ts|tsx|mdx)',
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
    };
    return config;
  },
};
