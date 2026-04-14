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

import {Module} from '@axelor/aos-mobile-core';
import StockScreens from './screens';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import * as stockReducers from './features';
import {
  stock_modelAPI,
  stock_searchFields,
  stock_sortFields,
  stock_typeObjects,
  stock_formsRegister,
} from './models';
import {useStockHeaders} from './hooks/use-stock-header-actions';

export const StockModule: Module = {
  name: 'app-stock',
  title: 'Stock',
  subtitle: 'Stock',
  icon: 'boxes',
  compatibilityAOS: {
    moduleName: 'axelor-stock',
    downToVersion: '7.1.0',
  },
  menus: {
    stock_menu_product: {
      title: 'Stock_Product',
      icon: 'cart-fill',
      screen: 'ProductListScreen',
    },
    stock_menu_stock_correction: {
      title: 'Stock_StockCorrection',
      icon: 'box2-fill',
      screen: 'StockCorrectionListScreen',
    },
    stock_menu_internal_move: {
      title: 'Stock_InternalMove',
      icon: 'dolly',
      screen: 'InternalMoveListScreen',
    },
    stock_menu_customer_delivery: {
      title: 'Stock_CustomerDelivery',
      icon: 'truck',
      screen: 'CustomerDeliveryListScreen',
    },
    stock_menu_logistical_form: {
      title: 'Stock_LogisticalForm',
      icon: 'boxes',
      screen: 'LogisticalFormListScreen',
    },
    stock_menu_supplier_arrival: {
      title: 'Stock_SupplierArrival',
      icon: 'truck-loading',
      screen: 'SupplierArrivalListScreen',
    },
    stock_menu_inventory: {
      title: 'Stock_Inventory',
      icon: 'house-check',
      screen: 'InventoryListScreen',
    },
    stock_menu_stockMovePlanning: {
      title: 'Stock_StockMovePlanning',
      icon: 'calendar2-week',
      screen: 'StockMovePlanningScreen',
    },
  },
  screens: StockScreens,
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  reducers: {
    ...stockReducers,
  },
  models: {
    objectFields: {...stock_modelAPI},
    sortFields: {...stock_sortFields},
    searchFields: {...stock_searchFields},
    headerRegisters: useStockHeaders,
    typeObjects: stock_typeObjects,
    formsRegister: stock_formsRegister,
  },
  requiredConfig: ['AppStock', 'AppSupplychain'],
};

export * from './api';
export * from './components';
export * from './features/asyncFunctions-index';
export * from './hooks';
export * from './providers';
export * from './screens';
export * from './types';
export * from './utils';
