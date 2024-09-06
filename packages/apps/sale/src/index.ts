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
import CartScreens from './screens/cart';
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
import {useSaleHeaders} from './hooks/use-sale-header-actions';

export const SaleModule: Module = {
  name: 'app-sale',
  title: 'Sale_Sales',
  subtitle: 'Sale_Sales',
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
    sale_menu_cartSeparator: {
      title: 'Sale_Cart',
      separator: true,
      hideIf: store => !store.sale?.isCartManagementEnabled,
    },
    sale_menu_activeCart: {
      title: 'Sale_ActiveCart',
      icon: 'basket2-fill',
      screen: 'ActiveCartScreen',
      hideIf: store => !store.sale?.isCartManagementEnabled,
    },
    sale_menu_catalog: {
      title: 'Sale_Catalog',
      icon: 'cart-plus',
      screen: 'CatalogScreen',
      hideIf: store => !store.sale?.isCartManagementEnabled,
    },
    sale_menu_salesFollowUpSeparator: {
      title: 'Sale_SalesFollowUp',
      separator: true,
    },
    sale_menu_product: {
      title: 'Sale_ProductsServices',
      icon: 'tags',
      screen: 'ProductSaleListScreen',
    },
    sale_menu_quotations: {
      title: 'Sale_SaleQuotations',
      icon: 'file-earmark-text',
      screen: 'SaleQuotationsScreen',
    },
    sale_menu_orders: {
      title: 'Sale_SaleOrders',
      icon: 'file-earmark-ruled',
      screen: 'SaleOrdersScreen',
    },
    sale_menu_clients: {
      title: 'Sale_Clients',
      icon: 'people-fill',
      screen: 'ClientSaleListScreen',
    },
  },
  screens: {
    ...ProductScreens,
    ...SaleOrderScreens,
    ...ClientScreens,
    ...CartScreens,
  },
  models: {
    objectFields: {...sale_modelAPI},
    searchFields: {...sale_searchFields},
    sortFields: {...sale_sortFields},
    headerRegisters: useSaleHeaders,
    typeObjects: sale_typeObjects,
  },
  reducers: {...saleReducers},
  requiredConfig: ['AppSale'],
};

export * from './api';
export * from './components';
export * from './features/asyncFunctions-index';
export * from './screens/cart';
export * from './screens/product';
export * from './screens/saleOrder';
export * from './screens/client';
