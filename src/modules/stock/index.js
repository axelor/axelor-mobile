import * as CustomerDeliveryScreens from './screens/customerDeliveries';
import * as InternalMovesScreens from './screens/internalMoves';
import * as InventoriesScreens from './screens/inventories';
import * as ProductsScreens from './screens/products';
import * as StockCorrectionScreens from './screens/stockCorrections';
import * as SupplierArrivalsScreens from './screens/supplierArrivals';

export default {
  name: 'Stock',
  title: t => t('Stock'),
  icon: 'boxes',
  menus: {
    StockProduct: {
      title: t => t('Stock_Product'),
      icon: 'shopping-cart',
      screen: 'ProductListScreen',
    },
    StockCorrection: {
      title: t => t('Stock_StockCorrection'),
      icon: 'box',
      screen: 'StockCorrectionListScreen',
    },
    StockInternalMove: {
      title: t => t('Stock_InternalMove'),
      icon: 'dolly',
      screen: 'InternalMoveListScreen',
    },
    StockCustomerDelivery: {
      title: t => t('Stock_CustomerDelivery'),
      icon: 'truck',
      screen: 'CustomerDeliveryListScreen',
    },
    StockSupplierArrival: {
      title: t => t('Stock_SupplierArrival'),
      icon: 'truck-loading',
      screen: 'SupplierArrivalListScreen',
    },
    StockInventory: {
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
};
