import {Module} from '@aos-mobile/core';
import SettingsScreen from './screens/SettingsScreen';
import UserScreen from './screens/UserScreen';

const authModule: Module = {
  name: 'Auth',
  title: t => t('Auth'),
  icon: 'user',
  menus: {
    User: {
      title: t => t('User_UserProfile'),
      icon: 'user',
      screen: 'UserScreen',
    },
  },
  screens: {
    SettingsScreen: {component: SettingsScreen, title: t => t('User_Settings')},
    UserScreen: {component: UserScreen, title: t => t('User_UserProfile')},
  },
};

export default authModule;
