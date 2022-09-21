import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';

const {Navigator, Screen} = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="LoginScreen" component={LoginScreen} />
    </Navigator>
  );
};

export default RootNavigator;
