import InternalMoveDetailsGeneralScreen from './InternalMoveDetailsGeneralScreen';
import InternalMoveLineDetailsScreen from './InternalMoveLineDetailsScreen';
import InternalMoveLineListScreen from './InternalMoveLineListScreen';
import InternalMoveListScreen from './InternalMoveListScreen';
import InternalMoveSelectFromLocationScreen from './InternalMoveSelectFromLocationScreen';
import InternalMoveSelectProductScreen from './InternalMoveSelectProductScreen';
import InternalMoveSelectToLocationScreen from './InternalMoveSelectToLocationScreen';
import InternalMoveSelectTrackingScreen from './InternalMoveSelectTrackingScreen';

export default {
  InternalMoveListScreen: {
    title: t => t('Stock_InternalMove'),
    component: InternalMoveListScreen,
    options: {
      shadedHeader: false,
    },
  },
  InternalMoveDetailsGeneralScreen: {
    title: t => t('Stock_InternalMove'),
    component: InternalMoveDetailsGeneralScreen,
  },
  InternalMoveLineDetailsScreen: {
    title: t => t('Stock_InternalMove'),
    component: InternalMoveLineDetailsScreen,
  },
  InternalMoveLineListScreen: {
    title: t => t('Stock_InternalMove'),
    component: InternalMoveLineListScreen,
  },
  InternalMoveSelectFromLocationScreen: {
    title: t => t('Stock_InternalMove'),
    component: InternalMoveSelectFromLocationScreen,
  },
  InternalMoveSelectProductScreen: {
    title: t => t('Stock_InternalMove'),
    component: InternalMoveSelectProductScreen,
  },
  InternalMoveSelectToLocationScreen: {
    title: t => t('Stock_InternalMove'),
    component: InternalMoveSelectToLocationScreen,
  },
  InternalMoveSelectTrackingScreen: {
    title: t => t('Stock_InternalMove'),
    component: InternalMoveSelectTrackingScreen,
  },
};
