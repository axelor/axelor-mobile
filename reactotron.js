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

const {exec} = require('child_process');
const os = require('os');

const installAdb = () => {
  const platform = os.platform();

  console.log('adb not found. Attempting to install...');

  if (platform === 'linux') {
    exec('sudo apt update && sudo apt install -y adb', handleInstallResult);
  } else if (platform === 'darwin') {
    exec('brew install android-platform-tools', handleInstallResult);
  } else {
    console.error('Unsupported OS for automatic adb installation.');
    process.exit(1);
  }
};

const handleInstallResult = error => {
  if (error) {
    console.error(`Failed to install adb: ${error.message}`);
    process.exit(1);
  } else {
    console.log('adb installed successfully.');
    setupAdbReverse();
  }
};

const setupAdbReverse = () => {
  console.log('Setting up adb reverse port forwarding...');
  exec('adb reverse tcp:9090 tcp:9090', error => {
    if (error) {
      console.error(`Error setting up adb reverse: ${error.message}`);
    } else {
      console.log('adb reverse port forwarding set up successfully.');
    }
  });
};

exec('command -v adb', err => {
  if (err) {
    installAdb();
  } else {
    setupAdbReverse();
  }
});
