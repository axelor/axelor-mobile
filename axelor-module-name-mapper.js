/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
