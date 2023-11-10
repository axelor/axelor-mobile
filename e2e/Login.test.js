const {remote} = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.aosmobile',
  'appium:appActivity': 'com.aosmobile.MainActivity',
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    const sessionNameField = driver.$('~sessionNameInput');
    const urlField = driver.$('~sessionUrlInput');
    const usernameField = driver.$('~sessionUsernameInput');
    const passwordField = driver.$('~sessionPasswordInput');

    await sessionNameField.addValue('Test session');
    await urlField.addValue('https://test.axelor.com/open-suite-dev');
    await usernameField.addValue('admin');
    await passwordField.addValue('@axadmin');

    const loginButton = driver.$('~loginButton');

    loginButton.click();
  } finally {
    await driver.pause(12000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
