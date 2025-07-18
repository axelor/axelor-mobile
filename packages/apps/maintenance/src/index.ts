/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import MaintenanceScreens from './screens';
import * as maintenanceReducers from './features';
import {
  maintenance_modelAPI,
  maintenance_searchFields,
  maintenance_sortFields,
  maintenance_typeObjects,
} from './models';
import {useMaintenanceHeaders} from './hooks/use-maintenance-header-actions';

export const MaintenanceModule: Module = {
  name: 'app-maintenance',
  title: 'Maintenance_Maintenance',
  subtitle: 'Maintenance_Maintenance',
  icon: 'wrench',
  compatibilityAOS: {
    moduleName: 'axelor-maintenance',
    downToVersion: '8.5.0',
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  menus: {
    maintenance_menu_maintenanceRequests: {
      title: 'Maintenance_MaintenanceRequests',
      icon: 'clipboard-x',
      screen: 'MaintenanceRequestListScreen',
    },
  },
  screens: MaintenanceScreens,
  reducers: maintenanceReducers,
  models: {
    objectFields: maintenance_modelAPI,
    searchFields: maintenance_searchFields,
    sortFields: maintenance_sortFields,
    typeObjects: maintenance_typeObjects,
    headerRegisters: useMaintenanceHeaders,
  },
};

export * from './api';
export * from './components';
export * from './features/asyncFunctions-index';
export * from './screens';
