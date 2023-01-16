import {Module} from '../app/Module';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import * as authReducers from './features';
import {SettingsScreen, UserScreen} from './screens';

export const authModule: Module = {
  name: 'Auth',
  title: 'User_User',
  subtitle: 'User_User',
  icon: 'user',
  menus: {
    auth_menu_user: {
      title: 'User_UserProfile',
      icon: 'user',
      screen: 'UserScreen',
    },
  },
  screens: {
    UserScreen: {
      title: 'User_UserProfile',
      component: UserScreen,
    },
    SettingsScreen: {
      title: 'User_Settings',
      component: SettingsScreen,
    },
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  reducers: {
    ...authReducers,
  },
};

export * from './screens';
export * from './api';
export * from './features/asyncFunctionsIndex';
