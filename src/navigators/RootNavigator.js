import React from 'react';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@/modules/auth/screens/LoginScreen';
import AppNavigator from './AppNavigator';

const {Navigator, Screen} = createNativeStackNavigator();

const RootNavigator = () => {
  const logged = useSelector(state => state.auth.logged);

  return (
    <Navigator screenOptions={{headerShown: false}}>
      {!logged ? (
        <Screen name="LoginScreen" component={LoginScreen} />
      ) : (
        <Screen name="AppNavigator" component={AppNavigator} />
      )}
    </Navigator>
  );
};

export default RootNavigator;
