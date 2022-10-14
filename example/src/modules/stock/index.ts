import {Module} from '@aos-mobile/core';
import CustomerDeliveryScreens from './screens/customerDeliveries';
import InternalMovesScreens from './screens/internalMoves';
import InventoriesScreens from './screens/inventories';
import ProductsScreens from './screens/products';
import StockCorrectionScreens from './screens/stockCorrections';
import SupplierArrivalsScreens from './screens/supplierArrivals';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import * as stockReducers from './features';

const stockModule: Module = {
  name: 'Stock',
  title: t => t('Stock'),
  icon: 'cubes',
  menus: {
    stock_menu_product: {
      title: t => t('Stock_Product'),
      icon: 'shopping-cart',
      screen: 'ProductListScreen',
    },
    stock_menu_stock_correction: {
      title: t => t('Stock_StockCorrection'),
      icon: 'box',
      screen: 'StockCorrectionListScreen',
    },
    stock_menu_internal_move: {
      title: t => t('Stock_InternalMove'),
      icon: 'dolly',
      screen: 'InternalMoveListScreen',
    },
    stock_menu_customer_delivery: {
      title: t => t('Stock_CustomerDelivery'),
      icon: 'truck',
      screen: 'CustomerDeliveryListScreen',
    },
    stock_menu_supplier_arrival: {
      title: t => t('Stock_SupplierArrival'),
      icon: 'truck-loading',
      screen: 'SupplierArrivalListScreen',
    },
    stock_menu_inventory: {
      title: t => t('Stock_Inventory'),
      icon: 'warehouse',
      screen: 'InventoryListScreen',
    },
  },
  screens: {
    ...CustomerDeliveryScreens,
    ...InternalMovesScreens,
    ...InventoriesScreens,
    ...ProductsScreens,
    ...StockCorrectionScreens,
    ...SupplierArrivalsScreens,
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  reducers: {
    ...stockReducers,
  },
};

export default stockModule;
