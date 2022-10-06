import OperationOrderDetailsScreen from './OperationOrderDetailsScreen';
import OperationOrderListScreen from './OperationOrderListScreen';

export default {
  OperationOrderListScreen: {
    title: t => t('Manufacturing_OperationOrder'),
    component: OperationOrderListScreen,
    options: {
      shadedHeader: false,
    },
  },
  OperationOrderDetailsScreen: {
    title: t => t('Manufacturing_OperationOrder'),
    component: OperationOrderDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
};
