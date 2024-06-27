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

import {Module} from '@axelor/aos-mobile-core';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import ProductScreens from './screens/product';
import SaleOrderScreens from './screens/saleOrder';
import ClientScreens from './screens/client';
import * as saleReducers from './features';
import {
  sale_modelAPI,
  sale_searchFields,
  sale_sortFields,
  sale_typeObjects,
} from './models';
import {useSalesHeaders} from './hooks/use-sales-header-actions';

export const SalesModule: Module = {
  name: 'app-sales',
  title: 'Sales_Sales',
  subtitle: 'Sales_Sales',
  icon: 'graph-up-arrow',
  compatibilityAOS: {
    moduleName: 'axelor-sale',
    downToVersion: '8.2.0',
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  menus: {
    sales_menu_product: {
      title: 'Sales_ProductsServices',
      icon: 'basket2-fill',
      screen: 'ProductSalesListScreen',
    },
    sales_menu_quotations: {
      title: 'Sales_SaleQuotations',
      icon: 'file-earmark-text',
      screen: 'SaleQuotationsScreen',
    },
    sales_menu_orders: {
      title: 'Sales_SaleOrders',
      icon: 'file-earmark-ruled',
      screen: 'SaleOrdersScreen',
    },
    sales_menu_clients: {
      title: 'Sales_Clients',
      icon: 'people-fill',
      screen: 'ClientListScreen',
    },
  },
  screens: {
    ...ProductScreens,
    ...SaleOrderScreens,
    ...ClientScreens,
  },
  models: {
    objectFields: {...sale_modelAPI},
    searchFields: {...sale_searchFields},
    sortFields: {...sale_sortFields},
    headerRegisters: useSalesHeaders,
    typeObjects: sale_typeObjects,
  },
  reducers: {...saleReducers},
  requiredConfig: ['AppSale'],
};

export * from './api';
export * from './components';
export * from './features/asyncFunctions-index';
export * from './screens/product';
export * from './screens/saleOrder';
export * from './screens/client';
