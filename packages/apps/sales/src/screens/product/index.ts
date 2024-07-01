/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import ProductSalesDetailsScreen from './ProductSalesDetailsScreen';
import ProductSalesListScreen from './ProductSalesListScreen';

export default {
  ProductSalesListScreen: {
    title: 'Sales_ProductsServices',
    component: ProductSalesListScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  ProductSalesDetailsScreen: {
    title: 'Sales_ProductService',
    component: ProductSalesDetailsScreen,
    actionID: 'sales_product_details',
    options: {
      shadedHeader: false,
    },
  },
};

export {ProductSalesListScreen};
export {ProductSalesDetailsScreen};
