import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerToggleButton} from '@react-navigation/drawer';
import ProductListScreen from '@/modules/stock/screens/products/ProductListScreen';
import ProductStockDetailsScreen from '@/modules/stock/screens/products/ProductStockDetailsScreen';
import ProductDetails from '../screens/products/ProductDetails';

const {Navigator, Screen} = createStackNavigator();

const ProductNavigator = () => {
  return (
    <Navigator>
      <Screen
        name="ProductListScreen"
        component={ProductListScreen}
        options={{
          headerLeft: props => <DrawerToggleButton {...props} />,
          headerTitle: 'Products',
        }}
      />
      <Screen
        name="ProductStockDetailsScreen"
        component={ProductStockDetailsScreen}
        options={{
          headerTitle: 'Product',
        }}
      />
      <Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerTitle: 'Product Details',
        }}
      />
    </Navigator>
  );
};

export default ProductNavigator;
