import CustomerDeliveryDetailScreen from './CustomerDeliveryDetailScreen';
import CustomerDeliveryLineDetailScreen from './CustomerDeliveryLineDetailScreen';
import CustomerDeliveryLineListScreen from './CustomerDeliveryLineListScreen';
import CustomerDeliveryListScreen from './CustomerDeliveryListScreen';
import CustomerDeliverySelectProductScreen from './CustomerDeliverySelectProductScreen';
import CustomerDeliverySelectTrackingScreen from './CustomerDeliverySelectTrackingScreen';

export default {
  CustomerDeliveryListScreen: {
    title: t => t('Stock_CustomerDelivery'),
    component: CustomerDeliveryListScreen,
    options: {
      shadedHeader: false,
    },
  },
  CustomerDeliveryDetailScreen: {
    title: t => t('Stock_CustomerDelivery'),
    component: CustomerDeliveryDetailScreen,
  },
  CustomerDeliveryLineDetailScreen: {
    title: t => t('Stock_CustomerDelivery'),
    component: CustomerDeliveryLineDetailScreen,
  },
  CustomerDeliveryLineListScreen: {
    title: t => t('Stock_CustomerDelivery'),
    component: CustomerDeliveryLineListScreen,
  },
  CustomerDeliverySelectProductScreen: {
    title: t => t('Stock_CustomerDelivery'),
    component: CustomerDeliverySelectProductScreen,
  },
  CustomerDeliverySelectTrackingScreen: {
    title: t => t('Stock_CustomerDelivery'),
    component: CustomerDeliverySelectTrackingScreen,
  },
};
