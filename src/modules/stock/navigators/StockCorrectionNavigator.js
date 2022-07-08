import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerToggleButton} from '@react-navigation/drawer';
import StockCorrectionListScreen from '@/modules/stock/screens/stockCorrections/StockCorrectionListScreen';
import StockCorrectionDetailsScreen from '@/modules/stock/screens/stockCorrections/StockCorrectionDetailsScreen';
import StockCorrectionNewLocationScreen from '@/modules/stock/screens/stockCorrections/StockCorrectionNewLocationScreen';
import StockCorrectionNewProductScreen from '@/modules/stock/screens/stockCorrections/StockCorrectionNewProductScreen';
import StockCorrectionNewTrackingScreen from '@/modules/stock/screens/stockCorrections/StockCorrectionNewTrackingScreen';
import ProductNavigator from './ProductNavigator';
import {useThemeColor} from '@/features/themeSlice';

const {Navigator, Screen} = createStackNavigator();

const StockCorrectionNavigator = () => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <Navigator>
      <Screen
        name="StockCorrectionListScreen"
        component={StockCorrectionListScreen}
        options={{
          headerLeft: props => (
            <DrawerToggleButton {...props} tintColor={Colors.primaryColor} />
          ),
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: 'Stock corrections',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="StockCorrectionDetailsScreen"
        component={StockCorrectionDetailsScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: 'Stock correction',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="StockCorrectionNewLocationScreen"
        component={StockCorrectionNewLocationScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: 'Stock correction',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="StockCorrectionNewProductScreen"
        component={StockCorrectionNewProductScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: 'Stock correction',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="StockCorrectionNewTrackingScreen"
        component={StockCorrectionNewTrackingScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: {backgroundColor: Colors.backgroundColor},
          headerTitle: 'Stock correction',
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

export default StockCorrectionNavigator;
