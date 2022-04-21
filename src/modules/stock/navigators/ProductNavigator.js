import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerToggleButton} from '@react-navigation/drawer';
import ProductListScreen from '@/modules/stock/screens/products/ProductListScreen';
import ProductStockDetailsScreen from '@/modules/stock/screens/products/ProductStockDetailsScreen';

const {Navigator, Screen} = createStackNavigator();

const ProductNavigator = () => {
  return (
    <Navigator>
      <Screen
        name="ProductList"
        component={ProductListScreen}
        options={{
          headerLeft: props => <DrawerToggleButton {...props} />,
          headerTitle: 'Products',
        }}
      />
      <Screen
        name="ProductStockDetails"
        component={ProductStockDetailsScreen}
        options={{
          headerTitle: 'Product',
        }}
      />
    </Navigator>
  );
};

export default ProductNavigator;
