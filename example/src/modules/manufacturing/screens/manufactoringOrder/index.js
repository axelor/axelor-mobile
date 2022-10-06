import ManufacturingOrderDetailsScreen from './ManufacturingOrderDetailsScreen';
import ManufacturingOrderListSaleOrderScreen from './ManufacturingOrderListSaleOrderScreen';
import ManufacturingOrderListScreen from './ManufacturingOrderListScreen';
import ManufacturingOrderOperationListScreen from './ManufacturingOrderOperationListScreen';
import ConsumedProductScreens from './consumedProduct';
import ProducedProductScreens from './producedProduct';
import WasteProductScreens from './wasteProduct';
import ManufacturingOrderListProductionOrderScreen from './ManufacturingOrderListProductionOrderScreen';

export default {
  ManufacturingOrderListScreen: {
    title: t => t('Manufacturing_ManufacturingOrder'),
    component: ManufacturingOrderListScreen,
    options: {
      shadedHeader: false,
    },
  },
  ManufacturingOrderDetailsScreen: {
    title: t => t('Manufacturing_ManufacturingOrder'),
    component: ManufacturingOrderDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  ManufacturingOrderListSaleOrderScreen: {
    title: t => t('Manufacturing_ManufacturingOrder'),
    component: ManufacturingOrderListSaleOrderScreen,
    options: {
      shadedHeader: false,
    },
  },
  ManufacturingOrderOperationListScreen: {
    title: t => t('Manufacturing_ManufacturingOrder'),
    component: ManufacturingOrderOperationListScreen,
    options: {
      shadedHeader: false,
    },
  },
  ManufacturingOrderListProductionOrderScreen: {
    title: t => t('Manufacturing_ManufacturingOrder'),
    component: ManufacturingOrderListProductionOrderScreen,
    options: {
      shadedHeader: false,
    },
  },
  ...ConsumedProductScreens,
  ...ProducedProductScreens,
  ...WasteProductScreens,
};
