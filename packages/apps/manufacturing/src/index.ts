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
import ManufacturingOrderScreens from './screens/manufactoringOrder';
import OperationOrderScreens from './screens/operationOrder';
import StockScreens from './screens/stock';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import * as manufacturingReducers from './features';
import {
  manufacturing_modelAPI,
  manufacturing_searchFields,
  manufacturing_sortFields,
  manufacturing_typeObjects,
} from './models';
import {useManufacturingHeaders} from './hooks/use-manufacturing-headers';

export const ManufacturingModule: Module = {
  name: 'app-manufacturing',
  title: 'Manufacturing_Manufacturing',
  subtitle: 'Manufacturing_Manufacturing',
  icon: 'gear-fill',
  compatibilityAOS: {
    moduleName: 'axelor-production',
    downToVersion: '6.4.0',
  },
  menus: {
    manufacturing_menu_manufacturing_order: {
      title: 'Manufacturing_ManufacturingOrder',
      icon: 'journal-text',
      screen: 'ManufacturingOrderListScreen',
    },
    manufacturing_menu_operation_order: {
      title: 'Manufacturing_OperationOrder',
      icon: 'dolly-flatbed',
      screen: 'OperationOrderListScreen',
    },
    manufacturing_menu_operation_order_planning: {
      title: 'Manufacturing_PlannedOperationOrder',
      icon: 'calendar-range',
      screen: 'OperationOrderPlanningScreen',
    },
  },
  screens: {
    ...ManufacturingOrderScreens,
    ...OperationOrderScreens,
    ...StockScreens,
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  reducers: {
    ...manufacturingReducers,
  },
  models: {
    objectFields: {...manufacturing_modelAPI},
    sortFields: {...manufacturing_sortFields},
    searchFields: {...manufacturing_searchFields},
    headerRegisters: useManufacturingHeaders,
    typeObjects: manufacturing_typeObjects,
  },
  requiredConfig: ['AppProduction'],
};

export * from './api';
export * from './components';
export * from './features/asyncFunctions-index';
export * from './screens/manufactoringOrder/consumedProduct';
export * from './screens/manufactoringOrder/producedProduct';
export * from './screens/manufactoringOrder/wasteProduct';
export * from './screens/manufactoringOrder';
export * from './screens/operationOrder';
export * from './screens/operationOrder';
export * from './screens/stock/products/';
export * from './screens/stock';
export * from './types';
export * from './utils';
