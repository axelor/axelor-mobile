/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import ProductSaleDetailsScreen from './ProductSaleDetailsScreen';
import ProductSaleListScreen from './ProductSaleListScreen';
import ComplementaryProductsScreen from './ComplementaryProductsScreen';
import ProductSalePriceListsScreen from './ProductSalePriceListsScreen';
import VariantProductsScreen from './VariantProductsScreen';

export default {
  ProductSaleListScreen: {
    title: 'Sale_ProductsServices',
    component: ProductSaleListScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
    actionID: 'sale_product_list',
  },
  ProductSaleDetailsScreen: {
    title: 'Sale_ProductService',
    component: ProductSaleDetailsScreen,
    actionID: 'sale_product_details',
    options: {
      shadedHeader: false,
    },
  },
  ComplementaryProductsScreen: {
    title: 'Sale_ComplementaryProducts',
    component: ComplementaryProductsScreen,
    options: {
      shadedHeader: false,
    },
  },
  ProductSalePriceListsScreen: {
    title: 'Sale_ProductPriceLists',
    component: ProductSalePriceListsScreen,
    options: {
      shadedHeader: false,
    },
  },
  VariantProductsScreen: {
    title: 'Sale_Variants',
    component: VariantProductsScreen,
    options: {
      shadedHeader: false,
    },
  },
};

export {ProductSaleListScreen};
export {ProductSaleDetailsScreen};
export {ComplementaryProductsScreen};
export {ProductSalePriceListsScreen};
export {VariantProductsScreen};
