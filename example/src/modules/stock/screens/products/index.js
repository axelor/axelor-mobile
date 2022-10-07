import ProductAttachedFilesScreen from './ProductAttachedFilesScreen';
import ProductDetailsScreen from './ProductDetailsScreen';
import ProductImageScreen from './ProductImageScreen';
import ProductListScreen from './ProductListScreen';
import ProductListVariantScreen from './ProductListVariantScreen';
import ProductStockDetailsScreen from './ProductStockDetailsScreen';
import ProductStockLocationDetailsScreen from './ProductStockLocationDetailsScreen';

export default {
  ProductListScreen: {
    title: t => t('Stock_Product'),
    component: ProductListScreen,
    options: {
      shadedHeader: false,
    },
  },
  ProductStockDetailsScreen: {
    title: t => t('Stock_Product'),
    component: ProductStockDetailsScreen,
  },
  ProductStockLocationDetailsScreen: {
    title: t => t('Stock_QuantityStockLocation'),
    component: ProductStockLocationDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  ProductDetailsScreen: {
    title: t => t('Stock_ProductDetails'),
    component: ProductDetailsScreen,
  },
  ProductImageScreen: {
    title: t => t('Stock_Product'),
    component: ProductImageScreen,
  },
  ProductListVariantScreen: {
    title: t => t('Stock_Variants'),
    component: ProductListVariantScreen,
  },
  ProductAttachedFilesScreen: {
    title: t => t('Stock_Product'),
    component: ProductAttachedFilesScreen,
  },
};
