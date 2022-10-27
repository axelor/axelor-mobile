import InventoryLineDetailsScreen from './InventoryLineDetailsScreen';
import InventoryLineListScreen from './InventoryLineListScreen';
import InventoryListScreen from './InventoryListScreen';
import InventoryPlannedDetailsScreen from './InventoryPlannedDetailsScreen';
import InventorySelectProductScreen from './InventorySelectProductScreen';
import InventorySelectTrackingScreen from './InventorySelectTrackingScreen';
import InventoryStartedDetailsScreen from './InventoryStartedDetailsScreen';

export default {
  InventoryListScreen: {
    title: t => t('Stock_Inventory'),
    component: InventoryListScreen,
    options: {
      shadedHeader: false,
    },
  },
  InventoryPlannedDetailsScreen: {
    title: t => t('Stock_Inventory'),
    component: InventoryPlannedDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  InventoryStartedDetailsScreen: {
    title: t => t('Stock_Inventory'),
    component: InventoryStartedDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  InventoryLineDetailsScreen: {
    title: t => t('Stock_Inventory'),
    component: InventoryLineDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  InventoryLineListScreen: {
    title: t => t('Stock_Inventory'),
    component: InventoryLineListScreen,
    options: {
      shadedHeader: false,
    },
  },
  InventorySelectProductScreen: {
    title: t => t('Stock_Inventory'),
    component: InventorySelectProductScreen,
    options: {
      shadedHeader: false,
    },
  },
  InventorySelectTrackingScreen: {
    title: t => t('Stock_Inventory'),
    component: InventorySelectTrackingScreen,
    options: {
      shadedHeader: false,
    },
  },
};
