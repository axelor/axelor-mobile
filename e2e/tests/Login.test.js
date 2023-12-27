import {$, expect} from '@wdio/globals';

describe('Login test', () => {
  it('should allow us create new session and login', async () => {
    const sessionNameField = await $('~sessionNameInput');
    const urlField = await $('~sessionUrlInput');
    const usernameField = await $('~sessionUsernameInput');
    const passwordField = await $('~sessionPasswordInput');

    await sessionNameField.addValue('Test session');
    await urlField.addValue('https://test.axelor.com/open-suite-dev');
    await usernameField.addValue('admin');
    await passwordField.addValue('@axadmin');

    const text = await usernameField.getText();
    await expect(text).toBe('admin');

    const loginButton = await $('~loginButton');
    await loginButton.click();
  });
});
