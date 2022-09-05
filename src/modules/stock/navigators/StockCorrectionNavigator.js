import React, {useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerToggleButton} from '@react-navigation/drawer';
import StockCorrectionListScreen from '@/modules/stock/screens/stockCorrections/StockCorrectionListScreen';
import StockCorrectionDetailsScreen from '@/modules/stock/screens/stockCorrections/StockCorrectionDetailsScreen';
import StockCorrectionNewLocationScreen from '@/modules/stock/screens/stockCorrections/StockCorrectionNewLocationScreen';
import StockCorrectionNewProductScreen from '@/modules/stock/screens/stockCorrections/StockCorrectionNewProductScreen';
import StockCorrectionNewTrackingScreen from '@/modules/stock/screens/stockCorrections/StockCorrectionNewTrackingScreen';
import ProductNavigator from './ProductNavigator';
import {useThemeColor} from '@/features/themeSlice';
import useTranslator from '@/hooks/use-translator';
import {getHeaderStyles} from '@/utils/headerStyle';

const {Navigator, Screen} = createStackNavigator();

const StockCorrectionNavigator = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const styles = useMemo(() => getHeaderStyles(Colors), [Colors]);

  return (
    <Navigator>
      <Screen
        name="StockCorrectionListScreen"
        component={StockCorrectionListScreen}
        options={{
          headerLeft: props => (
            <DrawerToggleButton {...props} tintColor={Colors.primaryColor} />
          ),
          headerStyle: styles.listScreenHeaderStyle,
          headerTitle: I18n.t('Stock_StockCorrection'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="StockCorrectionDetailsScreen"
        component={StockCorrectionDetailsScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: styles.headerColor,
          headerTitle: I18n.t('Stock_StockCorrection'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="StockCorrectionNewLocationScreen"
        component={StockCorrectionNewLocationScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: styles.headerColor,
          headerTitle: I18n.t('Stock_StockCorrection'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="StockCorrectionNewProductScreen"
        component={StockCorrectionNewProductScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: styles.headerColor,
          headerTitle: I18n.t('Stock_StockCorrection'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="StockCorrectionNewTrackingScreen"
        component={StockCorrectionNewTrackingScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: styles.headerColor,
          headerTitle: I18n.t('Stock_StockCorrection'),
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

export default StockCorrectionNavigator;
