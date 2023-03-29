import {useEffect} from 'react';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {headerActionsProvider} from '../../header';
import {useSelector} from '../../redux/hooks';
import {useTranslator} from '../../i18n';
import {useNavigation} from '../../hooks/use-navigation';

export const useAuthHeaders = () => {
  useUserProfileActions();
};

const useUserProfileActions = () => {
  const navigation = useNavigation();
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {user} = useSelector(state => state.user);

  useEffect(() => {
    headerActionsProvider.registerModel('auth_user_profile', {
      actions: [
        {
          key: 'settings',
          order: 10,
          iconName: 'cog',
          iconColor: Colors.primaryColor.background,
          title: I18n.t('User_Settings'),
          onPress: () => navigation.navigate('SettingsScreen', {user: user}),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, navigation, user]);
};
