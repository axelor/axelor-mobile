import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerToggleButton} from '@react-navigation/drawer';
import StockCorrectionListScreen from '@/modules/stock/screens/stockCorrections/StockCorrectionListScreen';
import StockCorrectionDetailsScreen from '@/modules/stock/screens/stockCorrections/StockCorrectionDetailsScreen';
import StockCorrectionNewDraftScreen from '@/modules/stock/screens/stockCorrections/StockCorrectionNewDraftScreen';
import StockCorrectionNewLocationScreen from '@/modules/stock/screens/stockCorrections/StockCorrectionNewLocationScreen';
import StockCorrectionNewProductScreen from '@/modules/stock/screens/stockCorrections/StockCorrectionNewProductScreen';
import StockCorrectionNewTrackingScreen from '@/modules/stock/screens/stockCorrections/StockCorrectionNewTrackingScreen';
import {IconNew} from '@/components/atoms';

const {Navigator, Screen} = createStackNavigator();

const StockCorrectionNavigator = () => {
  return (
    <Navigator>
      <Screen
        name="StockCorrectionListScreen"
        component={StockCorrectionListScreen}
        options={{
          headerLeft: props => (
            <DrawerToggleButton {...props} tintColor="#3ECF8E" />
          ),
          headerTitle: 'Stock corrections',
          headerRight: props => <IconNew {...props} />,
        }}
      />
      <Screen
        name="StockCorrectionDetailsScreen"
        component={StockCorrectionDetailsScreen}
        options={{
          headerTitle: 'Stock correction',
        }}
      />
      <Screen
        name="StockCorrectionNewDraftScreen"
        component={StockCorrectionNewDraftScreen}
        options={{
          headerTitle: 'Stock correction',
        }}
      />
      <Screen
        name="StockCorrectionNewLocationScreen"
        component={StockCorrectionNewLocationScreen}
        options={{
          headerTitle: 'Stock correction',
        }}
      />
      <Screen
        name="StockCorrectionNewProductScreen"
        component={StockCorrectionNewProductScreen}
        options={{
          headerTitle: 'Stock correction',
        }}
      />
      <Screen
        name="StockCorrectionNewTrackingScreen"
        component={StockCorrectionNewTrackingScreen}
        options={{
          headerTitle: 'Stock correction',
        }}
      />
    </Navigator>
  );
};

export default StockCorrectionNavigator;
