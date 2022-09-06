import StockCorrectionDetailsScreen from './StockCorrectionDetailsScreen';
import StockCorrectionListScreen from './StockCorrectionListScreen';
import StockCorrectionNewLocationScreen from './StockCorrectionNewLocationScreen';
import StockCorrectionNewProductScreen from './StockCorrectionNewProductScreen';
import StockCorrectionNewTrackingScreen from './StockCorrectionNewTrackingScreen';

export default {
  StockCorrectionListScreen: {
    title: t => t('Stock_StockCorrection'),
    component: StockCorrectionListScreen,
    options: {
      isListScreen: true,
    },
  },
  StockCorrectionDetailsScreen: {
    title: t => t('Stock_StockCorrection'),
    component: StockCorrectionDetailsScreen,
  },
  StockCorrectionNewLocationScreen: {
    title: t => t('Stock_StockCorrection'),
    component: StockCorrectionNewLocationScreen,
  },
  StockCorrectionNewProductScreen: {
    title: t => t('Stock_StockCorrection'),
    component: StockCorrectionNewProductScreen,
  },
  StockCorrectionNewTrackingScreen: {
    title: t => t('Stock_StockCorrection'),
    component: StockCorrectionNewTrackingScreen,
  },
};
