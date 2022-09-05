import React, {useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerToggleButton} from '@react-navigation/drawer';
import CustomerDeliveryListScreen from '../screens/customerDeliveries/CustomerDeliveryListScreen';
import CustomerDeliveryDetailScreen from '../screens/customerDeliveries/CustomerDeliveryDetailScreen';
import CustomerDeliveryLineListScreen from '../screens/customerDeliveries/CustomerDeliveryLineListScreen';
import ProductNavigator from './ProductNavigator';
import CustomerDeliverySelectProductScreen from '../screens/customerDeliveries/CustomerDeliverySelectProductScreen';
import CustomerDeliverySelectTrackingScreen from '../screens/customerDeliveries/CustomerDeliverySelectTrackingScreen';
import CustomerDeliveryLineDetailScreen from '../screens/customerDeliveries/CustomerDeliveryLineDetailScreen';
import {useThemeColor} from '@/features/themeSlice';
import useTranslator from '@/hooks/use-translator';
import {getHeaderStyles} from '@/utils/headerStyle';

const {Navigator, Screen} = createStackNavigator();

const CustomerDeliveryNavigator = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const styles = useMemo(() => getHeaderStyles(Colors), [Colors]);

  return (
    <Navigator>
      <Screen
        name="CustomerDeliveryListScreen"
        component={CustomerDeliveryListScreen}
        options={{
          headerLeft: props => (
            <DrawerToggleButton {...props} tintColor={Colors.primaryColor} />
          ),
          headerStyle: styles.listScreenHeaderStyle,
          headerTitle: I18n.t('Stock_CustomerDelivery'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="CustomerDeliveryDetailScreen"
        component={CustomerDeliveryDetailScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: styles.headerColor,
          headerTitle: I18n.t('Stock_CustomerDelivery'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="CustomerDeliveryLineListScreen"
        component={CustomerDeliveryLineListScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: styles.headerColor,
          headerTitle: I18n.t('Stock_CustomerDelivery'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="CustomerDeliverySelectProductScreen"
        component={CustomerDeliverySelectProductScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: styles.headerColor,
          headerTitle: I18n.t('Stock_CustomerDelivery'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="CustomerDeliverySelectTrackingScreen"
        component={CustomerDeliverySelectTrackingScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: styles.headerColor,
          headerTitle: I18n.t('Stock_CustomerDelivery'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="CustomerDeliveryLineDetailScreen"
        component={CustomerDeliveryLineDetailScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: styles.headerColor,
          headerTitle: I18n.t('Stock_CustomerDelivery'),
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

export default CustomerDeliveryNavigator;
