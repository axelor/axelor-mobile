import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserScreen from '@/modules/auth/screens/UserScreen';
import {DrawerToggleButton} from '@react-navigation/drawer';
import SettingsScreen from '../screens/SettingsScreen';
import {useThemeColor} from '@/features/themeSlice';

const {Navigator, Screen} = createStackNavigator();

const UserNavigator = () => {
  const Colors = useThemeColor();
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
          headerTitle: 'User Profile',
          headerTitleStyle: {color: Colors.text},
        }}
      />
      <Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: 'Settings',
          headerTitleStyle: {color: Colors.text},
        }}
      />
    </Navigator>
  );
};

export default UserNavigator;
