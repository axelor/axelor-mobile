import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProductNavigator from '@/modules/stock/navigators/ProductNavigator';
import StockCorrectionNavigator from '@/modules/stock/navigators/StockCorrectionNavigator';
import InternalMoveNavigator from '@/modules/stock/navigators/InternalMoveNavigator';
import CustomerDeliveryNavigator from '@/modules/stock/navigators/CustomerDeliveryNavigator';
import SupplierArrivalNavigator from '@/modules/stock/navigators/SupplierArrivalNavigator';
import InventoryNavigator from '@/modules/stock/navigators/InventoryNavigator';
import {Icon} from '@/components/atoms';
import {isMenuEnabled} from '@/utils/config';

const {Screen} = createDrawerNavigator();

const ICON_SIZE = 20;

const StockAppNavigator = (Colors, stockMenus, I18n) => {
  return (
    <>
      {isMenuEnabled({
        listMenu: stockMenus,
        menuName: 'stock-menu-product',
      }) && (
        <Screen
          name="stock-menu-product"
          component={ProductNavigator}
          options={{
            drawerInactiveTintColor: Colors.text,
            drawerActiveTintColor: Colors.primaryColor,
            title: I18n.t('Stock_Product'),
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
      {isMenuEnabled({
        listMenu: stockMenus,
        menuName: 'stock-menu-stock-correction',
      }) && (
        <Screen
          name="stock-menu-stock-correction"
          component={StockCorrectionNavigator}
          options={{
            drawerActiveTintColor: Colors.primaryColor,
            drawerInactiveTintColor: Colors.text,
            title: I18n.t('Stock_StockCorrection'),
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
      {isMenuEnabled({
        listMenu: stockMenus,
        menuName: 'stock-menu-internal-move',
      }) && (
        <Screen
          name="stock-menu-internal-move"
          component={InternalMoveNavigator}
          options={{
            drawerActiveTintColor: Colors.primaryColor,
            drawerInactiveTintColor: Colors.text,
            title: I18n.t('Stock_InternalMove'),
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
      {isMenuEnabled({
        listMenu: stockMenus,
        menuName: 'stock-menu-customer-delivery',
      }) && (
        <Screen
          name="stock-menu-customer-delivery"
          component={CustomerDeliveryNavigator}
          options={{
            drawerActiveTintColor: Colors.primaryColor,
            drawerInactiveTintColor: Colors.text,
            title: I18n.t('Stock_CustomerDelivery'),
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
      {isMenuEnabled({
        listMenu: stockMenus,
        menuName: 'stock-menu-supplier-arrival',
      }) && (
        <Screen
          name="stock-menu-supplier-arrival"
          component={SupplierArrivalNavigator}
          options={{
            drawerActiveTintColor: Colors.primaryColor,
            drawerInactiveTintColor: Colors.text,
            title: I18n.t('Stock_SupplierArrival'),
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
      {isMenuEnabled({
        listMenu: stockMenus,
        menuName: 'stock-menu-inventory',
      }) && (
        <Screen
          name="stock-menu-inventory"
          component={InventoryNavigator}
          options={{
            drawerActiveTintColor: Colors.primaryColor,
            drawerInactiveTintColor: Colors.text,
            title: I18n.t('Stock_Inventory'),
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
    </>
  );
};

export default StockAppNavigator;
