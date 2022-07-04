import React, {useMemo} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import UserNavigator from '@/modules/auth/navigators/UserNavigator';
import ProductNavigator from '@/modules/stock/navigators/ProductNavigator';
import StockCorrectionNavigator from '@/modules/stock/navigators/StockCorrectionNavigator';
import InternalMoveNavigator from '@/modules/stock/navigators/InternalMoveNavigator';
import CustomerDeliveryNavigator from '@/modules/stock/navigators/CustomerDeliveryNavigator';
import SupplierArrivalNavigator from '@/modules/stock/navigators/SupplierArrivalNavigator';
import InventoryNavigator from '@/modules/stock/navigators/InventoryNavigator';
import {Icon} from '@/components/atoms';
import {ColorHook} from '@/themeStore';
import {useSelector} from 'react-redux';
import {isMenuEnabled} from '@/utils/config';

const {Navigator, Screen} = createDrawerNavigator();

const ICON_SIZE = 20;

const AppNavigator = () => {
  const Colors = ColorHook();
  const {stockMenus} = useSelector(state => state.appConfig);

  const productEnabled = useMemo(
    () =>
      isMenuEnabled({
        listMenu: stockMenus,
        menuName: 'stock-menu-product',
      }),
    [stockMenus],
  );

  const stockCorrectionEnabled = useMemo(
    () =>
      isMenuEnabled({
        listMenu: stockMenus,
        menuName: 'stock-menu-stock-correction',
      }),
    [stockMenus],
  );

  const internalMoveEnabled = useMemo(
    () =>
      isMenuEnabled({
        listMenu: stockMenus,
        menuName: 'stock-menu-internal-move',
      }),
    [stockMenus],
  );

  const customerDeliveryEnabled = useMemo(
    () =>
      isMenuEnabled({
        listMenu: stockMenus,
        menuName: 'stock-menu-customer-delivery',
      }),
    [stockMenus],
  );

  const supplierArrivalEnabled = useMemo(
    () =>
      isMenuEnabled({
        listMenu: stockMenus,
        menuName: 'stock-menu-supplier-arrival',
      }),
    [stockMenus],
  );

  const inventoryEnabled = useMemo(
    () =>
      isMenuEnabled({
        listMenu: stockMenus,
        menuName: 'stock-menu-inventory',
      }),
    [stockMenus],
  );

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: Colors.backgroundColor,
        },
      }}
      initialRouteName="base-menu-user">
      {productEnabled && (
        <Screen
          name="stock-menu-product"
          component={ProductNavigator}
          options={{
            drawerInactiveTintColor: Colors.text,
            drawerActiveTintColor: Colors.primaryColor,
            title: 'Product',
            drawerIcon: () => (
              <Icon
                name="shopping-cart"
                size={ICON_SIZE}
                color={Colors.secondaryColor_dark}
              />
            ),
          }}
        />
      )}
      {stockCorrectionEnabled && (
        <Screen
          name="stock-menu-stock-correction"
          component={StockCorrectionNavigator}
          options={{
            drawerActiveTintColor: Colors.primaryColor,
            drawerInactiveTintColor: Colors.text,
            title: 'Stock correction',
            drawerIcon: () => (
              <Icon
                name="box"
                size={ICON_SIZE}
                color={Colors.secondaryColor_dark}
              />
            ),
          }}
        />
      )}
      {internalMoveEnabled && (
        <Screen
          name="stock-menu-internal-move"
          component={InternalMoveNavigator}
          options={{
            drawerActiveTintColor: Colors.primaryColor,
            drawerInactiveTintColor: Colors.text,
            title: 'Internal move',
            drawerIcon: () => (
              <Icon
                name="dolly"
                size={ICON_SIZE}
                color={Colors.secondaryColor_dark}
              />
            ),
          }}
        />
      )}
      {customerDeliveryEnabled && (
        <Screen
          name="stock-menu-customer-delivery"
          component={CustomerDeliveryNavigator}
          options={{
            drawerActiveTintColor: Colors.primaryColor,
            drawerInactiveTintColor: Colors.text,
            title: 'Customer Delivery',
            drawerIcon: () => (
              <Icon
                name="truck"
                size={ICON_SIZE}
                color={Colors.secondaryColor_dark}
              />
            ),
          }}
        />
      )}
      {supplierArrivalEnabled && (
        <Screen
          name="stock-menu-supplier-arrival"
          component={SupplierArrivalNavigator}
          options={{
            drawerActiveTintColor: Colors.primaryColor,
            drawerInactiveTintColor: Colors.text,
            title: 'Supplier Arrivals',
            drawerIcon: () => (
              <Icon
                name="truck-loading"
                size={ICON_SIZE}
                color={Colors.secondaryColor_dark}
              />
            ),
          }}
        />
      )}
      {inventoryEnabled && (
        <Screen
          name="stock-menu-inventory"
          component={InventoryNavigator}
          options={{
            drawerActiveTintColor: Colors.primaryColor,
            drawerInactiveTintColor: Colors.text,
            title: 'Inventories',
            drawerIcon: () => (
              <Icon
                name="warehouse"
                size={ICON_SIZE}
                color={Colors.secondaryColor_dark}
              />
            ),
          }}
        />
      )}
      <Screen
        name="base-menu-user"
        component={UserNavigator}
        options={{
          drawerActiveTintColor: Colors.primaryColor,
          drawerInactiveTintColor: Colors.text,
          title: 'User',
          drawerIcon: () => (
            <Icon
              name="user-alt"
              size={ICON_SIZE}
              color={Colors.secondaryColor_dark}
            />
          ),
        }}
      />
    </Navigator>
  );
};

export default AppNavigator;
