const path = require('path');
const root = path.resolve(__dirname, '../../');

module.exports = {
  projectRoot: __dirname,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  watchFolders: [root],
  resolver: {
    extraNodeModules: {
      react: `${__dirname}/node_modules/react`,
      'react-native': `${__dirname}/node_modules/react-native`
    }
  }
};
