import React, {useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerToggleButton} from '@react-navigation/drawer';
import CustomerDeliveryListScreen from '../screens/customerDeliveries/CustomerDeliveryListScreen';
import {StyleSheet} from 'react-native';
import CustomerDeliveryDetailScreen from '../screens/customerDeliveries/CustomerDeliveryDetailScreen';
import CustomerDeliveryLineListScreen from '../screens/customerDeliveries/CustomerDeliveryLineListScreen';
import ProductNavigator from './ProductNavigator';
import CustomerDeliverySelectProductScreen from '../screens/customerDeliveries/CustomerDeliverySelectProductScreen';
import CustomerDeliverySelectTrackingScreen from '../screens/customerDeliveries/CustomerDeliverySelectTrackingScreen';
import CustomerDeliveryLineDetailScreen from '../screens/customerDeliveries/CustomerDeliveryLineDetailScreen';
import {useThemeColor} from '@/features/themeSlice';

const {Navigator, Screen} = createStackNavigator();

const CustomerDeliveryNavigator = () => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <Navigator>
      <Screen
        name="CustomerDeliveryListScreen"
        component={CustomerDeliveryListScreen}
        options={{
          headerLeft: props => (
            <DrawerToggleButton {...props} tintColor={Colors.primaryColor} />
          ),
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: 'Customer Delivery',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="CustomerDeliveryDetailScreen"
        component={CustomerDeliveryDetailScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: 'Customer Delivery',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="CustomerDeliveryLineListScreen"
        component={CustomerDeliveryLineListScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: 'Customer Delivery',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="CustomerDeliverySelectProductScreen"
        component={CustomerDeliverySelectProductScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: 'Customer Delivery',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="CustomerDeliverySelectTrackingScreen"
        component={CustomerDeliverySelectTrackingScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: 'Customer Delivery',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="CustomerDeliveryLineDetailScreen"
        component={CustomerDeliveryLineDetailScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: 'Customer Delivery',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="ProductNavigator"
        component={ProductNavigator}
        options={{headerShown: false}}
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

export default CustomerDeliveryNavigator;
