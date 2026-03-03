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
import PurchaseScreens from './screens';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import * as purchaseReducers from './features';
import {
  purchase_formsRegister,
  purchase_modelAPI,
  purchase_searchFields,
  purchase_sortFields,
  purchase_typeObjects,
} from './models';
import {usePurchaseHeaders} from './hooks/use-purchase-header-actions';

export const PurchaseModule: Module = {
  name: 'app-purchase',
  title: 'Purchase_Purchase',
  subtitle: 'Purchase_Purchase',
  icon: 'cart-fill',
  compatibilityAOS: {
    moduleName: 'axelor-purchase',
    downToVersion: '8.3.0',
  },
  menus: {
    purchase_menu_internal_request: {
      title: 'Purchase_InternalRequests',
      icon: 'file-earmark-ruled',
      screen: 'RequestListScreen',
    },
    purchase_menu_request_creation: {
      title: 'Purchase_CreateRequest',
      icon: 'cart-plus',
      screen: 'RequestCreationScreen',
    },
  },
  screens: {
    ...PurchaseScreens,
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  models: {
    headerRegisters: usePurchaseHeaders,
    objectFields: {...purchase_modelAPI},
    sortFields: {...purchase_sortFields},
    searchFields: {...purchase_searchFields},
    formsRegister: {...purchase_formsRegister},
    typeObjects: purchase_typeObjects,
  },
  reducers: {
    ...purchaseReducers,
  },
  requiredConfig: ['AppPurchase'],
};

export * from './api';
export * from './features/asyncFunctions-index';
export * from './components';
export * from './screens';
