import React, {useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerToggleButton} from '@react-navigation/drawer';
import InternalMoveListScreen from '@/modules/stock/screens/internalMoves/InternalMoveListScreen';
import InternalMoveLineDetailsScreen from '@/modules/stock/screens/internalMoves/InternalMoveLineDetailsScreen';
import InternalMoveSelectFromLocationScreen from '@/modules/stock/screens/internalMoves/InternalMoveSelectFromLocationScreen';
import InternalMoveSelectToLocationScreen from '@/modules/stock/screens/internalMoves/InternalMoveSelectToLocationScreen';
import InternalMoveSelectProductScreen from '@/modules/stock/screens/internalMoves/InternalMoveSelectProductScreen';
import InternalMoveSelectTrackingScreen from '@/modules/stock/screens/internalMoves/InternalMoveSelectTrackingScreen';
import InternalMoveDetailsGeneralScreen from '@/modules/stock/screens/internalMoves/InternalMoveDetailsGeneralScreen';
import InternalMoveLineListScreen from '@/modules/stock/screens/internalMoves/InternalMoveLineListScreen';
import ProductNavigator from './ProductNavigator';
import StockCorrectionNavigator from './StockCorrectionNavigator';
import {useThemeColor} from '@/features/themeSlice';
import useTranslator from '@/hooks/use-translator';
import {getHeaderStyles} from '@/utils/headerStyle';

const {Navigator, Screen} = createStackNavigator();

const InternalMoveNavigator = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const styles = useMemo(() => getHeaderStyles(Colors), [Colors]);

  return (
    <Navigator>
      <Screen
        name="InternalMoveListScreen"
        component={InternalMoveListScreen}
        options={{
          headerLeft: props => (
            <DrawerToggleButton {...props} tintColor={Colors.primaryColor} />
          ),
          headerStyle: styles.listScreenHeaderStyle,
          headerTitle: I18n.t('Stock_InternalMove'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="InternalMoveDetailsGeneralScreen"
        component={InternalMoveDetailsGeneralScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: styles.headerColor,
          headerTitle: I18n.t('Stock_InternalMove'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="InternalMoveLineListScreen"
        component={InternalMoveLineListScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: styles.headerColor,
          headerTitle: I18n.t('Stock_InternalMove'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="InternalMoveLineDetailsScreen"
        component={InternalMoveLineDetailsScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: styles.headerColor,
          headerTitle: I18n.t('Stock_InternalMove'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="InternalMoveSelectFromLocationScreen"
        component={InternalMoveSelectFromLocationScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: styles.headerColor,
          headerTitle: I18n.t('Stock_InternalMove'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="InternalMoveSelectToLocationScreen"
        component={InternalMoveSelectToLocationScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: styles.headerColor,
          headerTitle: I18n.t('Stock_InternalMove'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="InternalMoveSelectProductScreen"
        component={InternalMoveSelectProductScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerStyle: styles.headerColor,
          headerTitle: I18n.t('Stock_InternalMove'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="InternalMoveSelectTrackingScreen"
        component={InternalMoveSelectTrackingScreen}
        options={{
          headerTintColor: Colors.primaryColor,
          headerTitle: I18n.t('Stock_InternalMove'),
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="ProductNavigator"
        component={ProductNavigator}
        options={{headerShown: false}}
      />
      <Screen
        name="StockCorrectionNavigator"
        component={StockCorrectionNavigator}
        options={{headerShown: false}}
      />
    </Navigator>
  );
};

export default InternalMoveNavigator;
