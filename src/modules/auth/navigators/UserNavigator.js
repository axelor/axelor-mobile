import React, { useEffect } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserScreen from '@/modules/auth/screens/UserScreen';
import {DrawerToggleButton} from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';

const {Navigator, Screen} = createStackNavigator();

const UserNavigator = () => {
  const {t,i18n} = useTranslation();
  useEffect(()=>{
    i18n.changeLanguage('ar');
  },[])
  return (
    <Navigator screenOptions={{headerTitle: ''}}>
      <Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          headerLeft: props => (
            <DrawerToggleButton {...props} tintColor="#3ECF8E" />
          ),
          headerTitle:  t('WelcomText'), 
        }}
      />
    </Navigator>
  );
};

export default UserNavigator;
