import AuthScreens from './auth';
import CustomerDeliveryScreens from './customerDeliveries';
import InternalMoveScreens from './internalMoves';
import InventoryScreens from './inventories';
import LogisticalFormScreens from './logisticalForms';
import ProductScreens from './products';
import StockCorrectionScreens from './stockCorrections';
import StockMoveScreens from './stockMoves';
import SupplierArrivalScreens from './supplierArrivals';

export default {
  ...AuthScreens,
  ...CustomerDeliveryScreens,
  ...InternalMoveScreens,
  ...InventoryScreens,
  ...LogisticalFormScreens,
  ...ProductScreens,
  ...StockCorrectionScreens,
  ...StockMoveScreens,
  ...SupplierArrivalScreens,
};

export * from './auth';
export * from './customerDeliveries';
export * from './internalMoves';
export * from './inventories';
export * from './logisticalForms';
export * from './products';
export * from './stockCorrections';
export * from './stockMoves';
export * from './supplierArrivals';
