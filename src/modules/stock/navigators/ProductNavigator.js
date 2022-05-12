import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerToggleButton} from '@react-navigation/drawer';
import ProductListScreen from '@/modules/stock/screens/products/ProductListScreen';
import ProductStockDetailsScreen from '@/modules/stock/screens/products/ProductStockDetailsScreen';
import ProductDetails from '../screens/products/ProductDetails';
import ProductListVariables from '../screens/products/ProductListVariables';
import ProductImageScreen from '../screens/products/productImageScreen';

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
        name="ProductVariables"
        component={ProductListVariables}
        options={{
          headerTitle: 'Variants',
        }}
      />
      <Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerTitle: 'Product Details',
        }}
      />
      <Screen
        name="ProductImage"
        component={ProductImageScreen}
        options={{
          headerTitle: 'Product',
        }}
      />
    </Navigator>
  );
};

export default ProductNavigator;
