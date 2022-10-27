import ProductAttachedFilesScreen from './ProductAttachedFilesScreen';
import ProductDetailsScreen from './ProductDetailsScreen';
import ProductImageScreen from './ProductImageScreen';
import ProductListScreen from './ProductListScreen';
import ProductListVariantScreen from './ProductListVariantScreen';
import ProductStockDetailsScreen from './ProductStockDetailsScreen';
import ProductStockLocationDetailsScreen from './ProductStockLocationDetailsScreen';

export default {
  ProductListScreen: {
    title: 'Stock_Product',
    component: ProductListScreen,
    options: {
      shadedHeader: false,
    },
  },
  ProductStockDetailsScreen: {
    title: 'Stock_Product',
    component: ProductStockDetailsScreen,
  },
  ProductStockLocationDetailsScreen: {
    title: 'Stock_QuantityStockLocation',
    component: ProductStockLocationDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  ProductDetailsScreen: {
    title: 'Stock_ProductDetails',
    component: ProductDetailsScreen,
  },
  ProductImageScreen: {
    title: 'Stock_Product',
    component: ProductImageScreen,
  },
  ProductListVariantScreen: {
    title: 'Stock_Variants',
    component: ProductListVariantScreen,
  },
  ProductAttachedFilesScreen: {
    title: 'Stock_Product',
    component: ProductAttachedFilesScreen,
  },
};
