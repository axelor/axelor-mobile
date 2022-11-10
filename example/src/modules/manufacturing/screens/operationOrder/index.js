import OperationOrderAttachedFilesScreen from './OperationOrderAttachedFiles';
import OperationOrderDetailsScreen from './OperationOrderDetailsScreen';
import OperationOrderListScreen from './OperationOrderListScreen';
import OperationOrderMailMessagesScreen from './OperationOrderMailMessagesScreen';
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
  OperationOrderAttachedFilesScreen: {
    title: 'Manufacturing_AttachedFiles',
    component: OperationOrderAttachedFilesScreen,
    options: {
      shadedHeader: false,
    },
  },
  OperationOrderMailMessagesScreen: {
    title: 'Base_MailMessages',
    component: OperationOrderMailMessagesScreen,
    options: {
      shadedHeader: false,
    },
  },
};
