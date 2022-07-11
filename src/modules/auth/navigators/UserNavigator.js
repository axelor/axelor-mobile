import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserScreen from '@/modules/auth/screens/UserScreen';
import {DrawerToggleButton} from '@react-navigation/drawer';
import SettingsScreen from '../screens/SettingsScreen';
import {useThemeColor} from '@/features/themeSlice';
import useTranslator from '@/hooks/use-translator';

const {Navigator, Screen} = createStackNavigator();

const UserNavigator = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <Navigator>
      <Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          headerLeft: props => (
            <DrawerToggleButton {...props} tintColor={Colors.primaryColor} />
          ),
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('User.UserProfile'),
          headerTitleStyle: {color: Colors.text},
        }}
      />
      <Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('User.Settings'),
          headerTitleStyle: {color: Colors.text},
        }}
      />
    </Navigator>
  );
};

export default UserNavigator;
