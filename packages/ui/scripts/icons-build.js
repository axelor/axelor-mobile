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

const svgr = require('@svgr/core').transform;
const glob = require('glob');

const path = require('path');
const fs = require('fs').promises;

const OUT_DIR = './src/icons';

const config = {
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
  native: true,
  typescript: true,
};

function getFilepaths() {
  return new Promise((resolve, reject) => {
    glob('../../node_modules/bootstrap-icons/icons/*.svg', (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });
}

async function transform(files) {
  const fileContentJSON = {};
  for (const file of files) {
    const iconName = path.parse(file).name;
    const iconPathList = await transformFileToSvgPath(file);
    fileContentJSON[iconName] = iconPathList;
  }

  await generateFile(fileContentJSON);
}

async function transformFileToSvgPath(filepath) {
  const code = await fs.readFile(filepath, {encoding: 'utf8'});

  const output = await svgr(code, config, {
    componentName: '_',
  });

  return getSvgPathList(output);
}

function getSvgPathList(code) {
  const regex = /d="([^"]*)"/g;
  let match;
  const pathList = [];

  while ((match = regex.exec(code))) {
    pathList.push(match[1]);
  }

  return pathList;
}

async function generateFile(fileContentJSON) {
  const existingIconsPath = './scripts/custom-icon-map.json';
  let existingIcons = {};

  try {
    const existingIconsContent = await fs.readFile(existingIconsPath, {
      encoding: 'utf8',
    });
    existingIcons = JSON.parse(existingIconsContent);
  } catch (err) {
    console.error(err);
  }

  const combinedIcons = {...existingIcons, ...fileContentJSON};

  if (Object.keys(combinedIcons).length === 0) {
    return null;
  }

  await fs.writeFile(
    path.join(OUT_DIR, 'bootstrap-icon-map.json'),
    JSON.stringify(combinedIcons, undefined, 2),
  );
}

(async () => {
  try {
    await fs.mkdir(OUT_DIR);
    const files = await getFilepaths();
    await transform(files);
  } catch (err) {
    console.error(err);
    process.exit(-1);
  }
})();
