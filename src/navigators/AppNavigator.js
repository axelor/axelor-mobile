import React, {useMemo} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import UserNavigator from '@/modules/auth/navigators/UserNavigator';
import {Icon} from '@/components/atoms';
import {useThemeColor} from '@/features/themeSlice';
import StockAppNavigator from '@/modules/stock/StockAppNavigator';
import {useSelector} from 'react-redux';
import useTranslator from '@/hooks/use-translator';

const {Navigator, Screen} = createDrawerNavigator();

const ICON_SIZE = 20;

const AppNavigator = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {stockMenus} = useSelector(state => state.appConfig);

  const stockConfig = useMemo(() => {
    if (I18n && Colors) {
      return StockAppNavigator(Colors, stockMenus, I18n);
    }
  }, [Colors, I18n, stockMenus]);

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: Colors.backgroundColor,
        },
      }}
      initialRouteName="base-menu-user">
      {stockConfig}
      <Screen
        name="base-menu-user"
        component={UserNavigator}
        options={{
          drawerActiveTintColor: Colors.primaryColor,
          drawerInactiveTintColor: Colors.text,
          title: I18n.t('User_User'),
          drawerIcon: () => (
            <Icon
              name="user-alt"
              size={ICON_SIZE}
              color={Colors.secondaryColor_dark}
            />
          ),
        }}
      />
    </Navigator>
  );
};

export default AppNavigator;
