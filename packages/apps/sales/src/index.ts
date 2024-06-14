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
import * as saleReducers from './features';

export const SalesModule: Module = {
  name: 'app-sales',
  title: 'Sales_Sales',
  subtitle: 'Sales_Sales',
  icon: 'graph-up-arrow',
  compatibilityAOS: {
    moduleName: 'axelor-sales',
    downToVersion: '8.2.0',
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  reducers: {...saleReducers},
};

export * from './api';
export * from './components';
export * from './features/asyncFunctions-index';
