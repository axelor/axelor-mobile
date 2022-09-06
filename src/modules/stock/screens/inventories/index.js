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
      isListScreen: true,
    },
  },
  InventoryPlannedDetailsScreen: {
    title: t => t('Stock_Inventory'),
    component: InventoryPlannedDetailsScreen,
  },
  InventoryStartedDetailsScreen: {
    title: t => t('Stock_Inventory'),
    component: InventoryStartedDetailsScreen,
  },
  InventoryLineDetailsScreen: {
    title: t => t('Stock_Inventory'),
    component: InventoryLineDetailsScreen,
  },
  InventoryLineListScreen: {
    title: t => t('Stock_Inventory'),
    component: InventoryLineListScreen,
  },
  InventorySelectProductScreen: {
    title: t => t('Stock_Inventory'),
    component: InventorySelectProductScreen,
  },
  InventorySelectTrackingScreen: {
    title: t => t('Stock_Inventory'),
    component: InventorySelectTrackingScreen,
  },
};
