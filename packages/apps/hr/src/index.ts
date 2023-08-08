/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import HrScreens from './screens/';
import {hr_modelAPI, hr_searchFields, hr_sortFields} from './models';
import * as hrReducers from './features';

export const HrModule: Module = {
  name: 'app-hr',
  title: 'Hr_HumanRessources',
  subtitle: 'Hr_Hr',
  icon: 'sitemap',
  /*compatibilityAOS: {
    moduleName: 'axelor-hr',
    downToVersion: '7.2.0',
  },*/
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  menus: {
    hr_menu_expenseLines: {
      title: 'Hr_Expense_Lines',
      icon: 'receipt',
      screen: 'ExpenseLinesListScreen',
    },
  },
  screens: {
    ...HrScreens,
  },
  reducers: {...hrReducers},
  models: {
    objectFields: {...hr_modelAPI},
    sortFields: {...hr_sortFields},
    searchFields: {...hr_searchFields},
  },
};
