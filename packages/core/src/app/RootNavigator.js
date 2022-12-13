import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import {default as CoreNavigator} from '../navigator/Navigator';

const {Navigator, Screen} = createNativeStackNavigator();

const RootNavigator = ({modules, mainMenu, version}) => {
  const {logged} = useSelector(state => state.auth);

  const AppNavigator = useCallback(
    () => <CoreNavigator modules={modules} mainMenu={mainMenu} />,
    [modules, mainMenu],
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
