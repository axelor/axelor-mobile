import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerToggleButton} from '@react-navigation/drawer';
import ProductListScreen from '@/modules/stock/screens/products/ProductListScreen';
import ProductStockDetailsScreen from '@/modules/stock/screens/products/ProductStockDetailsScreen';
import ProductDetails from '../screens/products/ProductDetails';
import ProductListVariables from '../screens/products/ProductListVariables';
import ProductImageScreen from '../screens/products/productImageScreen';

const {Navigator, Screen} = createStackNavigator();

const ICON_COLOR = '#3ECF8E';

const ProductNavigator = () => {
  return (
    <Navigator>
      <Screen
        name="ProductListScreen"
        component={ProductListScreen}
        options={{
          headerLeft: props => (
            <DrawerToggleButton {...props} tintColor={ICON_COLOR} />
          ),
          headerTitle: 'Products',
        }}
      />
      <Screen
        name="ProductStockDetailsScreen"
        component={ProductStockDetailsScreen}
        options={{
          headerTintColor: ICON_COLOR,
          headerTitle: 'Product',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="ProductVariables"
        component={ProductListVariables}
        options={{
          headerTintColor: ICON_COLOR,
          headerTitle: 'Variants',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerTintColor: ICON_COLOR,
          headerTitle: 'Product Details',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="ProductImage"
        component={ProductImageScreen}
        options={{
          headerTintColor: ICON_COLOR,
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
