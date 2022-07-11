import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerToggleButton} from '@react-navigation/drawer';
import ProductListScreen from '@/modules/stock/screens/products/ProductListScreen';
import ProductStockDetailsScreen from '@/modules/stock/screens/products/ProductStockDetailsScreen';
import ProductDetailsScreen from '@/modules/stock/screens/products/ProductDetailsScreen';
import ProductListVariantScreen from '@/modules/stock/screens/products/ProductListVariantScreen';
import ProductImageScreen from '@/modules/stock/screens/products/ProductImageScreen';
import ProductAttachedFilesScreen from '@/modules/stock/screens/products/ProductAttachedFilesScreen';
import ProductStockLocationDetailsScreen from '../screens/products/ProductStockLocationDetailsScreen';
import {useThemeColor} from '@/features/themeSlice';
import useTranslator from '@/hooks/use-translator';

const {Navigator, Screen} = createStackNavigator();

const ProductNavigator = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <Navigator>
      <Screen
        name="ProductListScreen"
        component={ProductListScreen}
        options={{
          headerLeft: props => (
            <DrawerToggleButton {...props} tintColor={Colors.primaryColor} />
          ),
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_Product'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="ProductStockDetailsScreen"
        component={ProductStockDetailsScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_Product'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="ProductStockLocationDetailsScreen"
        component={ProductStockLocationDetailsScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_QuantityStockLocation'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="ProductListVariantScreen"
        component={ProductListVariantScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_Variants'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_ProductDetails'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="ProductImageScreen"
        component={ProductImageScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_Product'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="ProductAttachedFilesScreen"
        component={ProductAttachedFilesScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_Product'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
    </Navigator>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    headerTitle: {
      color: Colors.text,
    },
  });

export default ProductNavigator;
