const eslintConfig = require('../../.eslintrc.js');

module.exports = {
  ...eslintConfig,
  ignorePatterns: ['__tests__/', 'lib/', 'scripts/', 'stories/'],
};
