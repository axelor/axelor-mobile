import ChildrenManufOrderListScreen from './ChildrenManufOrderListScreen';
import ConsumedProductDetailsScreen from './ConsumedProductDetailsScreen';
import ConsumedProductListScreen from './ConsumedProductListScreen';
import ConsumedProductSelectProductScreen from './ConsumedProductSelectProductScreen';
import ConsumedProductSelectTrackingScreen from './ConsumedProductSelectTrackingScreen';

export default {
  ConsumedProductListScreen: {
    title: 'Manufacturing_ManufacturingOrder',
    component: ConsumedProductListScreen,
    options: {
      shadedHeader: false,
    },
  },
  ConsumedProductDetailsScreen: {
    title: 'Manufacturing_ConsumedProduct',
    component: ConsumedProductDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  ConsumedProductSelectProductScreen: {
    title: 'Manufacturing_ConsumedProduct',
    component: ConsumedProductSelectProductScreen,
    options: {
      shadedHeader: false,
    },
  },
  ConsumedProductSelectTrackingScreen: {
    title: 'Manufacturing_ConsumedProduct',
    component: ConsumedProductSelectTrackingScreen,
    options: {
      shadedHeader: false,
    },
  },
  ChildrenManufOrderListScreen: {
    title: 'Manufacturing_ConsumedProduct',
    component: ChildrenManufOrderListScreen,
    options: {
      shadedHeader: false,
    },
  },
};
