import {Module} from '@aos-mobile/core';
import SettingsScreen from './screens/SettingsScreen';
import UserScreen from './screens/UserScreen';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import * as authReducers from './features';

const authModule: Module = {
  name: 'Auth',
  title: t => t('User_User'),
  icon: 'user',
  menus: {
    auth_menu_user: {
      title: t => t('User_UserProfile'),
      icon: 'user',
      screen: 'UserScreen',
    },
  },
  screens: {
    SettingsScreen: {component: SettingsScreen, title: t => t('User_Settings')},
    UserScreen: {component: UserScreen, title: t => t('User_UserProfile')},
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  reducers: {
    ...authReducers,
  },
};

export default authModule;
