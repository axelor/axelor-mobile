/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
    actionID: 'stock_product_stockDetails',
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
    actionID: 'stock_product_details',
  },
  ProductImageScreen: {
    title: 'Stock_Product',
    component: ProductImageScreen,
  },
  ProductListVariantScreen: {
    title: 'Stock_Variants',
    component: ProductListVariantScreen,
  },
};
