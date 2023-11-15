import {testInstance_config} from './testInstance.config';

export const app_config = {
  /*
   * This configuration is used to fill in the url,
   * username and/or password fields automatically
   * when the application is running in debug mode
   */
  testInstanceConfig: {
    defaultUrl: testInstance_config.url,
    defaultUsername: testInstance_config.username,
    defaultPassword: testInstance_config.password,
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
   * This configuration allows you to activate or not the possibility to block the internet connection.
   * If enabled, the user will be able to block the internet connection for requests from the settings screen.
   */
  allowInternetConnectionBlock: false,

  /*
   * This setting enables backward compatibility with Axelor Open Suite version 6 and below.
   * This means that the app can still function and deliver its full features to users who have not upgraded to the latest versions of Axelor Open Suite.
   * However, it's important to note that enabling this feature may limit access to certain advanced features that are only available on higher versions of Axelor Open Suite.
   */
  retrocompatibilityAOS6: true,

  /*
   * This configuration enables verification of the minimum version required for the mobile application.
   * If this option is enabled and the application version is below the required version (minimalRequiredMobileAppVersion),
   * the user will be prompted to update the application using the Android and ios links provided to access it.
   * If this is not the case, the application will still work, but it is important to note that this may limit access to certain functionalities.
   */
  versionCheckConfig: {
    activate: true,
    android: 'https://play.google.com/store/apps/details?id=com.aosmobile',
    ios: 'https://apps.apple.com/fr/app/axelor-open-mobile/id6446699597',
  },

  /*
   * This configuration allows you to activate or not the subtitles under app icons in the drawer.
   * If enabled, subtitles will be displayed under app icons to provide additional context to the user.
   */
  //showModulesSubtitle: false,

  /*
   * This configuration allows you to customize the colors used in the application.
   * You can use the `ThemeColors` object to specify primary, secondary, error, and other color values.
   */
  themeColorsConfig: {
    primaryColor: {
      background_light: '#84DCB7',
      foreground: '#000000',
      background: '#3ECF8E',
    },
    secondaryColor: {
      background_light: '#DDDDDD',
      foreground: '#000000',
      background: '#CECECE',
    },
    secondaryColor_dark: {
      background_light: '#606060',
      foreground: '#FFFFFF',
      background: '#424242',
    },
  },

  /*
   * This configuration allows you to customize the writing styles used in the application.
   * You can use the `WritingStyles` object to specify defaultSize, title, subTitle, and other text styles.
   */
  //writingStylesConfig: {},

  /*
   * This configuration allows you to customize the logo displayed on the login screen.
   * By default, the application display the Axelor logo.
   */
  //logoFile: require('./asset/Logo_Axelor.png'),
};
