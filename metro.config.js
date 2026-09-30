const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://metrobundler.dev/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
/*
 * @axelor/app-bridge is linked from a local checkout until it is published. Files
 * outside the project resolve their imports (e.g. @babel/runtime helpers added by
 * the transform) from the project's node_modules.
 */
const config = {
  watchFolders: [path.resolve(__dirname, '../axelor-app-bridge')],
  resolver: {
    nodeModulesPaths: [path.resolve(__dirname, 'node_modules')],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
