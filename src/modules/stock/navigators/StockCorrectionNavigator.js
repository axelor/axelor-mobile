import React from 'react';
import {StyleSheet} from 'react-native';
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

const ICON_COLOR = '#3ECF8E';

const StockCorrectionNavigator = () => {
  return (
    <Navigator>
      <Screen
        name="StockCorrectionListScreen"
        component={StockCorrectionListScreen}
        options={{
          headerLeft: props => (
            <DrawerToggleButton {...props} tintColor={ICON_COLOR} />
          ),
          headerTitle: 'Stock corrections',
          headerRight: props => <IconNew {...props} />,
        }}
      />
      <Screen
        name="StockCorrectionDetailsScreen"
        component={StockCorrectionDetailsScreen}
        options={{
          headerTintColor: ICON_COLOR,
          headerTitle: 'Stock correction',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="StockCorrectionNewDraftScreen"
        component={StockCorrectionNewDraftScreen}
        options={{
          headerTintColor: ICON_COLOR,
          headerTitle: 'Stock correction',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="StockCorrectionNewLocationScreen"
        component={StockCorrectionNewLocationScreen}
        options={{
          headerTintColor: ICON_COLOR,
          headerTitle: 'Stock correction',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="StockCorrectionNewProductScreen"
        component={StockCorrectionNewProductScreen}
        options={{
          headerTintColor: ICON_COLOR,
          headerTitle: 'Stock correction',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="StockCorrectionNewTrackingScreen"
        component={StockCorrectionNewTrackingScreen}
        options={{
          headerTintColor: ICON_COLOR,
          headerTitle: 'Stock correction',
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

export default StockCorrectionNavigator;
