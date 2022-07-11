import React, {useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerToggleButton} from '@react-navigation/drawer';
import {StyleSheet} from 'react-native';
import ProductNavigator from './ProductNavigator';
import InventoryListScreen from '@/modules/stock/screens/inventories/InventoryListScreen';
import InventoryPlannedDetailsScreen from '@/modules/stock/screens/inventories/InventoryPlannedDetailsScreen';
import InventoryStartedDetailsScreen from '@/modules/stock/screens/inventories/InventoryStartedDetailsScreen';
import InventoryLineListDetailsScreen from '@/modules/stock/screens/inventories/InventoryLineListScreen';
import InventoryLineDetailsScreen from '@/modules/stock/screens/inventories/InventoryLineDetailsScreen';
import InventorySelectProductScreen from '@/modules/stock/screens/inventories/InventorySelectProductScreen';
import InventorySelectTrackingScreen from '@/modules/stock/screens/inventories/InventorySelectTrackingScreen';
import {useThemeColor} from '@/features/themeSlice';
import useTranslator from '@/hooks/use-translator';

const {Navigator, Screen} = createStackNavigator();

const InventoriesNavigator = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <Navigator>
      <Screen
        name="InventoryListScreen"
        component={InventoryListScreen}
        options={{
          headerLeft: props => (
            <DrawerToggleButton {...props} tintColor={Colors.primaryColor} />
          ),
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_Inventory'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="InventoryPlannedDetailsScreen"
        component={InventoryPlannedDetailsScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_Inventory'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="InventoryStartedDetailsScreen"
        component={InventoryStartedDetailsScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_Inventory'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="InventoryLineListDetailsScreen"
        component={InventoryLineListDetailsScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_Inventory'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="InventorySelectProductScreen"
        component={InventorySelectProductScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_Inventory'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="InventorySelectTrackingScreen"
        component={InventorySelectTrackingScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_Inventory'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="InventoryLineDetailsScreen"
        component={InventoryLineDetailsScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: I18n.t('Stock_Inventory'),
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

export default InventoriesNavigator;
