const {remote} = require('webdriverio');

/*const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.aosmobile',
  'appium:appActivity': 'com.aosmobile.MainActivity',
};*/

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.android.chrome',
  'appium:appActivity': 'com.google.android.apps.chrome.Main',
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
    (await driver.$('//*[@text="Accept & continue"]')).click();
    (await driver.$('//*[@text="No thanks"]')).click();
  } finally {
    await driver.pause(10000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
