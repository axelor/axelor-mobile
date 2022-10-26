import OperationOrderAttachedFilesScreen from './OperationOrderAttachedFiles';
import OperationOrderDetailsScreen from './OperationOrderDetailsScreen';
import OperationOrderListScreen from './OperationOrderListScreen';
import ProductionFileScreen from './ProductionFileScreen';

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
  ProductionFileScreen: {
    title: t => t('Manufacturing_ProductionFile'),
    component: ProductionFileScreen,
    options: {
      shadedHeader: false,
    },
  },
  OperationOrderAttachedFilesScreen: {
    title: t => t('Manufacturing_AttachedFiles'),
    component: OperationOrderAttachedFilesScreen,
    options: {
      shadedHeader: false,
    },
  },
};
