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

  /*
   * This setting is used to define the default request limit used is createStandardSearch
   * function (that is to say the number of elements per page on list screens). This value
   * can be rewritten for any request using props numberElementsByPage
   */
  defaultRequestLimit: 10,

  /*
   * This configuration allows you to activate or not the connection sessions.
   * If enabled, the user will be able to save sessions on their device for later use.
   */
  enableConnectionSessions: true,

  /*
   * This setting enables backward compatibility with Axelor Open Suite version 6 and below.
   * This means that the app can still function and deliver its full features to users who have not upgraded to the latest versions of Axelor Open Suite.
   * However, it's important to note that enabling this feature may limit access to certain advanced features that are only available on higher versions of Axelor Open Suite.
   */
  retrocompatibilityAOS6: true,
};
