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
    title: 'Manufacturing_ManufacturingOrder',
    component: ManufacturingOrderListScreen,
    options: {
      shadedHeader: false,
    },
  },
  ManufacturingOrderDetailsScreen: {
    title: 'Manufacturing_ManufacturingOrder',
    component: ManufacturingOrderDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  ManufacturingOrderListSaleOrderScreen: {
    title: 'Manufacturing_ManufacturingOrder',
    component: ManufacturingOrderListSaleOrderScreen,
    options: {
      shadedHeader: false,
    },
  },
  ManufacturingOrderOperationListScreen: {
    title: 'Manufacturing_ManufacturingOrder',
    component: ManufacturingOrderOperationListScreen,
    options: {
      shadedHeader: false,
    },
  },
  ManufacturingOrderListProductionOrderScreen: {
    title: 'Manufacturing_ManufacturingOrder',
    component: ManufacturingOrderListProductionOrderScreen,
    options: {
      shadedHeader: false,
    },
  },
  ...ConsumedProductScreens,
  ...ProducedProductScreens,
  ...WasteProductScreens,
};
