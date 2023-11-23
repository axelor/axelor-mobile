import * as wdio from 'webdriverio';

jest.setTimeout(60000);

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

describe('Login test', () => {
  let driver;

  beforeAll(async () => {
    driver = await wdio.remote(wdOpts);
    await driver.pause(10000);
  });

  afterAll(async () => {
    await driver.pause(12000);
    await driver.deleteSession();
  });

  it('should allow us create new session', async () => {
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
  });
});
