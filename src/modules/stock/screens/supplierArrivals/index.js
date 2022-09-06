import SupplierArrivalDetailsScreen from './SupplierArrivalDetailsScreen';
import SupplierArrivalLineDetailScreen from './SupplierArrivalLineDetailScreen';
import SupplierArrivalLineListScreen from './SupplierArrivalLineListScreen';
import SupplierArrivalListScreen from './SupplierArrivalListScreen';
import SupplierArrivalSelectProductScreen from './SupplierArrivalSelectProductScreen';
import SupplierArrivalSelectTrackingScreen from './SupplierArrivalSelectTrackingScreen';

export default {
  SupplierArrivalListScreen: {
    title: t => t('Stock_SupplierArrival'),
    component: SupplierArrivalListScreen,
    option: {
      isListScreen: true,
    },
  },
  SupplierArrivalDetailsScreen: {
    title: t => t('Stock_SupplierArrival'),
    component: SupplierArrivalDetailsScreen,
  },
  SupplierArrivalLineDetailScreen: {
    title: t => t('Stock_SupplierArrival'),
    component: SupplierArrivalLineDetailScreen,
  },
  SupplierArrivalLineListScreen: {
    title: t => t('Stock_SupplierArrival'),
    component: SupplierArrivalLineListScreen,
  },
  SupplierArrivalSelectProductScreen: {
    title: t => t('Stock_SupplierArrival'),
    component: SupplierArrivalSelectProductScreen,
  },
  SupplierArrivalSelectTrackingScreen: {
    title: t => t('Stock_SupplierArrival'),
    component: SupplierArrivalSelectTrackingScreen,
  },
};
