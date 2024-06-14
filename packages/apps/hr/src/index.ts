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
import ExpenseScreens from './screens/expense';
import TimesheetScreens from './screens/timesheet';
import {
  hr_modelAPI,
  hr_searchFields,
  hr_sortFields,
  hr_formsRegister,
} from './models';
import * as hrReducers from './features';
import {useHrHeaders} from './hooks/use-hr-header-actions';

export const HrModule: Module = {
  name: 'app-hr',
  title: 'Hr_HumanRessources',
  subtitle: 'Hr_Hr',
  icon: 'diagram-3-fill',
  compatibilityAOS: {
    moduleName: 'axelor-human-resource',
    downToVersion: '7.2.0',
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  menus: {
    hr_menu_timesheetsSeparator: {
      title: 'Hr_Timesheets',
      separator: true,
    },
    hr_menu_activeTimer: {
      title: 'Hr_ActiveTimer',
      icon: 'stopwatch',
      screen: 'ActiveTimerFormScreen',
      compatibilityAOS: {
        moduleName: 'axelor-human-resource',
        downToVersion: '8.0.0',
      },
    },
    hr_menu_timers: {
      title: 'Hr_Timers',
      icon: 'hourglass-split',
      screen: 'TimerListScreen',
      compatibilityAOS: {
        moduleName: 'axelor-human-resource',
        downToVersion: '8.0.0',
      },
      hideIf: store => !store.timesheet?.isMultipleTimerEnabled,
    },
    hr_menu_timesheets: {
      title: 'Hr_Timesheets',
      icon: 'clock-history',
      screen: 'TimesheetListScreen',
      compatibilityAOS: {
        moduleName: 'axelor-human-resource',
        downToVersion: '8.0.0',
      },
    },
    hr_menu_expensesSeparator: {
      title: 'Hr_Expenses',
      separator: true,
    },
    hr_menu_expenseLines: {
      title: 'Hr_ExpenseLines',
      icon: 'receipt',
      screen: 'ExpenseLinesListScreen',
    },
    hr_menu_expenses: {
      title: 'Hr_Expenses',
      icon: 'credit-card-fill',
      screen: 'ExpenseListScreen',
    },
  },
  screens: {
    ...ExpenseScreens,
    ...TimesheetScreens,
  },
  reducers: {...hrReducers},
  models: {
    objectFields: {...hr_modelAPI},
    sortFields: {...hr_sortFields},
    searchFields: {...hr_searchFields},
    formsRegister: {...hr_formsRegister},
    headerRegisters: useHrHeaders,
  },
  requiredConfig: ['AppExpense', 'AppTimesheet'],
};

export * from './api';
export * from './components';
export * from './features/asyncFunctions-index';
export * from './screens/expense';
export * from './screens/timesheet';
export * from './types';
export * from './utils';
