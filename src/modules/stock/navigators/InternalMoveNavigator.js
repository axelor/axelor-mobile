import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerToggleButton} from '@react-navigation/drawer';
import {IconNew} from '@/components/atoms';
import InternalMoveListScreen from '@/modules/stock/screens/internalMoves/InternalMoveListScreen';
import InternalMoveNewOriginalLocationScreen from '@/modules/stock/screens/internalMoves/InternalMoveNewOriginalLocationScreen';
import InternalMoveDetailsScreen from '@/modules/stock/screens/internalMoves/InternalMoveDetailsScreen';
import InternalMoveNewDestinationLocationScreen from '@/modules/stock/screens/internalMoves/InternalMoveNewDestinationLocationScreen';
import InternalMoveNewProductScreen from '@/modules/stock/screens/internalMoves/InternalMoveNewProductScreen';
import InternalMoveNewTrackingNumberScreen from '@/modules/stock/screens/internalMoves/InternalMoveNewTrackingNumberScreen';
import ProductStockDetailsScreen from '@/modules/stock/screens/products/ProductStockDetailsScreen';

const {Navigator, Screen} = createStackNavigator();

const ICON_COLOR = '#3ECF8E';

const InternalMoveNavigator = () => {
  return (
    <Navigator>
      <Screen
        name="InternalMoveListScreen"
        component={InternalMoveListScreen}
        options={{
          headerLeft: props => (
            <DrawerToggleButton {...props} tintColor={ICON_COLOR} />
          ),
          headerTitle: 'Internal moves',
          headerRight: props => <IconNew {...props} />,
        }}
      />
      <Screen
        name="InternalMoveDetailsScreen"
        component={InternalMoveDetailsScreen}
        options={{
          headerTintColor: ICON_COLOR,
          headerTitle: 'Internal move',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="InternalMoveNewOriginalLocationScreen"
        component={InternalMoveNewOriginalLocationScreen}
        options={{
          headerTintColor: ICON_COLOR,
          headerTitle: 'Internal move',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="InternalMoveNewDestinationLocationScreen"
        component={InternalMoveNewDestinationLocationScreen}
        options={{
          headerTintColor: ICON_COLOR,
          headerTitle: 'Internal move',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="InternalMoveNewProductScreen"
        component={InternalMoveNewProductScreen}
        options={{
          headerTintColor: ICON_COLOR,
          headerTitle: 'Internal move',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="InternalMoveNewTrackingNumberScreen"
        component={InternalMoveNewTrackingNumberScreen}
        options={{
          headerTintColor: ICON_COLOR,
          headerTitle: 'Internal move',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Screen
        name="ProductStockDetailsScreen"
        component={ProductStockDetailsScreen}
        options={{
          headerTintColor: ICON_COLOR,
          headerTitle: 'Product',
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

export default InternalMoveNavigator;
