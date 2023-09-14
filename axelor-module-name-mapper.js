const fs = require('fs');
const path = require('path');

/**
 * Recursively find package.json files in the specified directory and its subdirectories.
 * Extracts the mapping of package names to their corresponding lib paths.
 * @param {string} baseDir - The base directory to start the search.
 * @param {string} currentDir - The current subdirectory being processed.
 * @returns {Object} - An object mapping package names to their corresponding lib paths.
 */
function getModulePackageNameMapping(baseDir, currentDir = '') {
  const modulePackageNameMapping = {};

  // Function to recursively explore directories and find package.json files
  function exploreDir(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const isDirectory = fs.statSync(filePath).isDirectory();

      if (isDirectory && file !== 'node_modules') {
        exploreDir(filePath);
      } else if (file === 'package.json') {
        const packageJson = require(filePath);
        const packageName = packageJson.name;

        const libPath = path.relative(
          __dirname,
          path.join(dir, 'lib', 'index.js'),
        );

        if (fs.existsSync(libPath)) {
          modulePackageNameMapping[packageName] = `<rootDir>/${libPath}`;
        }
      }
    }
  }

  exploreDir(path.join(baseDir, currentDir));

  return modulePackageNameMapping;
}

// Define the base directory
const baseDirectory = path.resolve(__dirname, 'packages');

// Call the function to get module package name mapping
const modulePackageNameMapping = getModulePackageNameMapping(baseDirectory);

module.exports = {
  modulePackageNameMapping,
};
