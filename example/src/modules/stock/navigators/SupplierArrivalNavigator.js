import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerToggleButton} from '@react-navigation/drawer';
import SupplierArrivalListScreen from '@/modules/stock/screens/supplierArrivals/SupplierArrivalListScreen';
import SupplierArrivalDetailScreen from '@/modules/stock/screens/supplierArrivals/SupplierArrivalDetailsScreen';
import SupplierArrivalLineListScreen from '@/modules/stock/screens/supplierArrivals/SupplierArrivalLineListScreen';
import SupplierArrivalChangeLocationScreen from '@/modules/stock/screens/supplierArrivals/SupplierArrivalChangeLocationScreen';
import SupplierArrivalSelectProductScreen from '@/modules/stock/screens/supplierArrivals/SupplierArrivalSelectProductScreen';
import SupplierArrivalSelectTrackingScreen from '@/modules/stock/screens/supplierArrivals/SupplierArrivalSelectTrackingScreen';
import SupplierArrivalLineDetailScreen from '@/modules/stock/screens/supplierArrivals/SupplierArrivalLineDetailScreen';
import ProductNavigator from './ProductNavigator';
import {useThemeColor} from '@/features/themeSlice';
import useTranslator from '@/hooks/use-translator';

const {Navigator, Screen} = createStackNavigator();

const SupplierArrivalsNavigator = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <Navigator>
      <Screen
        name="SupplierArrivalListScreen"
        component={SupplierArrivalListScreen}
        options={{
          headerLeft: props => (
            <DrawerToggleButton {...props} tintColor={Colors.primaryColor} />
          ),
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_SupplierArrival'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="SupplierArrivalDetailsScreen"
        component={SupplierArrivalDetailScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_SupplierArrival'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="SupplierArrivalLineListScreen"
        component={SupplierArrivalLineListScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_SupplierArrival'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="SupplierArrivalChangeLocationScreen"
        component={SupplierArrivalChangeLocationScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_SupplierArrival'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="SupplierArrivalSelectProductScreen"
        component={SupplierArrivalSelectProductScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_SupplierArrival'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="SupplierArrivalSelectTrackingScreen"
        component={SupplierArrivalSelectTrackingScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_SupplierArrival'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="SupplierArrivalLineDetailScreen"
        component={SupplierArrivalLineDetailScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_SupplierArrival'),
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

export default SupplierArrivalsNavigator;
