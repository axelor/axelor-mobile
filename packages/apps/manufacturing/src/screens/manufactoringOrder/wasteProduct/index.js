import WasteProductDetailsScreen from './WasteProductDetailsScreen';
import WasteProductListScreen from './WasteProductListScreen';
import WasteProductSelectProductScreen from './WasteProductSelectProductScreen';

export default {
  WasteProductListScreen: {
    title: 'Manufacturing_ManufacturingOrder',
    component: WasteProductListScreen,
    options: {
      shadedHeader: false,
    },
  },
  WasteProductDetailsScreen: {
    title: 'Manufacturing_WasteDeclaration',
    component: WasteProductDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  WasteProductSelectProductScreen: {
    title: 'Manufacturing_WasteDeclaration',
    component: WasteProductSelectProductScreen,
    options: {
      shadedHeader: false,
    },
  },
};
