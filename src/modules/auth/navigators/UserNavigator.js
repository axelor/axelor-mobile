import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserScreen from '@/modules/auth/screens/UserScreen';
import {DrawerToggleButton} from '@react-navigation/drawer';

const {Navigator, Screen} = createStackNavigator();

const UserNavigator = () => {
  return (
    <Navigator screenOptions={{headerTitle: ''}}>
      <Screen
        name="UserScreen"
        component={UserScreen}
        options={{headerLeft: props => <DrawerToggleButton {...props} />}}
      />
    </Navigator>
  );
};

export default UserNavigator;
