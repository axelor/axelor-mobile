import React from 'react';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import UserNavigator from '@/modules/auth/navigators/UserNavigator';
import ProductNavigator from '@/modules/stock/navigators/ProductNavigator';
import StockCorrectionNavigator from '@/modules/stock/navigators/StockCorrectionNavigator';
import InternalMoveNavigator from '@/modules/stock/navigators/InternalMoveNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';

const {Navigator, Screen} = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen
        name="User"
        component={UserNavigator}
        options={{
          title: 'User',
          drawerIcon: () => <Icon name="user" size={24} color={'#606060'} />,
        }}
      />
      <Screen
        name="Product"
        component={ProductNavigator}
        options={{
          title: 'Product',
          drawerIcon: () => (
            <Icon name="shopping-cart" size={24} color={'#606060'} />
          ),
        }}
      />
      <Screen
        name="Stock correction"
        component={StockCorrectionNavigator}
        options={{
          title: 'Stock correction',
          drawerIcon: () => <Icon name="pencil" size={24} color={'#606060'} />,
        }}
      />
      <Screen
        name="Internal move"
        component={InternalMoveNavigator}
        options={{
          title: 'Internal move',
          drawerIcon: () => <Icon name="truck" size={24} color={'#606060'} />,
        }}
      />
    </Navigator>
  );
};

export default AppNavigator;
