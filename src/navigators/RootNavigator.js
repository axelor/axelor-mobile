import React from 'react';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@/modules/auth/screens/LoginScreen';
import UserScreen from '@/modules/auth/screens/UserScreen';

const {Navigator, Screen, Group} = createNativeStackNavigator();

const RootNavigator = () => {
  const logged = useSelector(state => state.auth.logged);

  return (
    <Navigator>
      {!logged ? (
        <Group screenOptions={{headerShown: false}}>
          <Screen name="LoginScreen" component={LoginScreen} />
        </Group>
      ) : (
        <Group>
          <Screen name="UserScreen" component={UserScreen} />
        </Group>
      )}
    </Navigator>
  );
};

export default RootNavigator;
