import ProducedProductDetailsScreen from './ProducedProductDetailsScreen';
import ProducedProductListScreen from './ProducedProductListScreen';
import ProducedProductSelectProductScreen from './ProducedProductSelectProductScreen';
import ProducedProductSelectTrackingScreen from './ProducedProductSelectTrackingScreen';

export default {
  ProducedProductListScreen: {
    title: t => t('Manufacturing_ManufacturingOrder'),
    component: ProducedProductListScreen,
    options: {
      shadedHeader: false,
    },
  },
  ProducedProductDetailsScreen: {
    title: t => t('Manufacturing_ProducedProduct'),
    component: ProducedProductDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  ProducedProductSelectProductScreen: {
    title: t => t('Manufacturing_ProducedProduct'),
    component: ProducedProductSelectProductScreen,
    options: {
      shadedHeader: false,
    },
  },
  ProducedProductSelectTrackingScreen: {
    title: t => t('Manufacturing_ProducedProduct'),
    component: ProducedProductSelectTrackingScreen,
    options: {
      shadedHeader: false,
    },
  },
};
