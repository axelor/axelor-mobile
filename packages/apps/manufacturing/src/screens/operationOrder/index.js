import OperationOrderDetailsScreen from './OperationOrderDetailsScreen';
import OperationOrderListScreen from './OperationOrderListScreen';
import OperationOrderPlanningScreen from './OperationOrderPlanningScreen';
import ProductionFileScreen from './ProductionFileScreen';

export default {
  OperationOrderListScreen: {
    title: 'Manufacturing_OperationOrder',
    component: OperationOrderListScreen,
    options: {
      shadedHeader: false,
    },
  },
  OperationOrderDetailsScreen: {
    title: 'Manufacturing_OperationOrder',
    component: OperationOrderDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  ProductionFileScreen: {
    title: 'Manufacturing_ProductionFile',
    component: ProductionFileScreen,
    options: {
      shadedHeader: false,
    },
  },
  OperationOrderPlanningScreen: {
    title: 'Manufacturing_OperationOrder',
    component: OperationOrderPlanningScreen,
    options: {
      shadedHeader: false,
    },
  },
};
