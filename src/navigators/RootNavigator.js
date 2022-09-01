import React from 'react';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@/modules/auth/screens/LoginScreen';

import StockModule from '@/modules/stock';

import BasicNavigator from './Navigator';
import {View} from 'react-native';

// Use only for example multiples modules
const ChessModule = {
  name: 'Chess',
  title: 'Chess',
  icon: 'chess-king',
  menus: {
    todo: {
      title: 'Queen',
      icon: 'chess-queen',
      screen: 'QueenScreen',
    },
  },
  screens: {
    QueenScreen: View,
  },
};

const modules = [StockModule, ChessModule];

const AppNavigator = () => {
  return <BasicNavigator modules={modules} />;
};

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
