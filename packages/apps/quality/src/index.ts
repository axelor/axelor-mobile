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
import QualityScreen from './screens/';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import {
  quality_modelAPI,
  quality_searchFields,
  quality_sortFields,
} from './models';
import * as qualityReducers from './features';

export const QualityModule: Module = {
  name: 'app-quality',
  title: 'Quality_Quality',
  subtitle: 'Quality_Quality',
  icon: 'clipboard-check',
  compatibilityAOS: {
    moduleName: 'axelor-quality',
    downToVersion: '8.0.0',
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  menus: {
    quality_menu_controlEntry: {
      title: 'Helpdesk_myTickets',
      icon: 'card-checklist',
      screen: 'ControlEntryListScreen',
    },
  },
  screens: {
    ...QualityScreen,
  },
  reducers: {...qualityReducers},
  models: {
    objectFields: {...quality_modelAPI},
    sortFields: {...quality_sortFields},
    searchFields: {...quality_searchFields},
  },
};

export * from './api';
export * from './components';
export * from './features/asyncFunctions-index';
export * from './screens';
export * from './types';
