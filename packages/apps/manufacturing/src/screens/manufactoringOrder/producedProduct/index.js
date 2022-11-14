import ProducedProductDetailsScreen from './ProducedProductDetailsScreen';
import ProducedProductListScreen from './ProducedProductListScreen';
import ProducedProductSelectProductScreen from './ProducedProductSelectProductScreen';
import ProducedProductSelectTrackingScreen from './ProducedProductSelectTrackingScreen';

export default {
  ProducedProductListScreen: {
    title: 'Manufacturing_ManufacturingOrder',
    component: ProducedProductListScreen,
    options: {
      shadedHeader: false,
    },
  },
  ProducedProductDetailsScreen: {
    title: 'Manufacturing_ProducedProduct',
    component: ProducedProductDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  ProducedProductSelectProductScreen: {
    title: 'Manufacturing_ProducedProduct',
    component: ProducedProductSelectProductScreen,
    options: {
      shadedHeader: false,
    },
  },
  ProducedProductSelectTrackingScreen: {
    title: 'Manufacturing_ProducedProduct',
    component: ProducedProductSelectTrackingScreen,
    options: {
      shadedHeader: false,
    },
  },
};
