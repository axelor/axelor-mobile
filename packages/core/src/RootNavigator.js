import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import {useSelector} from 'react-redux';
import {default as CoreNavigator} from './navigator/Navigator';

const {Navigator, Screen} = createNativeStackNavigator();

const RootNavigator = ({modules, mainMenu, version}) => {
  const {logged} = useSelector(state => state.auth);

  const AppNavigator = () => (
    <CoreNavigator modules={modules} mainMenu={mainMenu} />
  );

  return (
    <Navigator screenOptions={{headerShown: false}}>
      {!logged ? (
        <Screen
          name="LoginScreen"
          component={LoginScreen}
          initialParams={{version}}
        />
      ) : (
        <Screen name="AppNavigator" component={AppNavigator} />
      )}
    </Navigator>
  );
};

export default RootNavigator;
