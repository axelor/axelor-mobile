const wdio = require('webdriverio');

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
  /*let client;

  beforeAll(async () => {
    client = await wdio.remote(wdOpts);
  });

  afterAll(async () => {
    await client.deleteSession();
  });*/

  it('should allow us create new session', async () => {
    const client = await wdio.remote(wdOpts);
    try {
      const field = client.$('Session name');
      await field.addValue('test session');
      expect(await field.getText()).toEqual('test session');
    } finally {
      await client.pause(10000);
      await client.deleteSession();
    }
  });
});
