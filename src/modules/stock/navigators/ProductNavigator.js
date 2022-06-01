import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerToggleButton} from '@react-navigation/drawer';
import ProductListScreen from '@/modules/stock/screens/products/ProductListScreen';
import ProductStockDetailsScreen from '@/modules/stock/screens/products/ProductStockDetailsScreen';
import ProductDetailsScreen from '@/modules/stock/screens/products/ProductDetailsScreen';
import ProductListVariables from '@/modules/stock/screens/products/ProductListVariables';
import ProductImageScreen from '@/modules/stock/screens/products/ProductImageScreen';
import Colors from '@/types/colors';

const {Navigator, Screen} = createStackNavigator();

const ProductNavigator = () => {
  return (
    <Navigator>
      <Screen
        name="ProductListScreen"
        component={ProductListScreen}
        options={{
          headerLeft: props => (
            <DrawerToggleButton {...props} tintColor={Colors.icon.green} />
          ),
          headerTitle: 'Products',
        }}
      />
      <Screen
        name="ProductStockDetailsScreen"
        component={ProductStockDetailsScreen}
        options={{
          headerTintColor: Colors.icon.green,
          headerTitle: 'Product',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="ProductVariables"
        component={ProductListVariables}
        options={{
          headerTintColor: Colors.icon.green,
          headerTitle: 'Variants',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
        options={{
          headerTintColor: Colors.icon.green,
          headerTitle: 'Product Details',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="ProductImageScreen"
        component={ProductImageScreen}
        options={{
          headerTintColor: Colors.icon.green,
          headerTitle: 'Product',
          headerTitleStyle: styles.headerTitle,
        }}
      />
    </Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    color: '#000000',
  },
});

export default ProductNavigator;
