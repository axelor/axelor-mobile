import SettingsScreen from './screens/SettingsScreen';
import UserScreen from './screens/UserScreen';

export default {
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
    SettingsScreen,
    UserScreen,
  },
};
