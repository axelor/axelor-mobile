export const app_config = {
  /*
   * This configuration is used to fill in the url,
   * username and/or password fields automatically
   * when the application is running in debug mode
   */
  testInstanceConfig: {
    defaultUrl: '',
    defaultUsername: '',
    defaultPassword: '',
  },

  /*
   * This configuration is used to fill in the url field
   * automatically when the application is running in release mode.
   * It is also possible to hide the url input if needed to prevent users from changing it.
   */
  releaseInstanceConfig: {
    url: '',
    showUrlInput: true,
  },

  /*
   * This setting is used to define the default language of the application.
   * This value is automatically overwritten by the user's default language
   * once logged in if the latter is set.
   */
  defaultLanguage: 'en',
};
