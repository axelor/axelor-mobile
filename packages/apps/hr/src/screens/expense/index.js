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

import ExpenseLinesListScreen from './ExpenseLinesListScreen';
import ExpenseListScreen from './ExpenseListScreen';
import ExpenseDetailsScreen from './ExpenseDetailsScreen';
import ExpenseLineFormScreen from './ExpenseLineFormScreen';

export default {
  ExpenseLinesListScreen: {
    title: 'Hr_ExpenseLines',
    component: ExpenseLinesListScreen,
    actionID: 'hr_expenseLine_list',
    isUsableOnShortcut: true,
  },
  ExpenseListScreen: {
    title: 'Hr_Expenses',
    component: ExpenseListScreen,
    options: {
      shadedHeader: false,
    },
    actionID: 'hr_expenses_list',
    isUsableOnShortcut: true,
  },
  ExpenseDetailsScreen: {
    title: 'Hr_Expenses',
    component: ExpenseDetailsScreen,
    options: {
      shadedHeader: false,
    },
    actionID: 'hr_expense_details',
  },
  ExpenseLineFormScreen: {
    title: 'Hr_CreateExpenseLine',
    component: ExpenseLineFormScreen,
    actionID: 'hr_expenseLine_details',
    isUsableOnShortcut: true,
  },
};

export {ExpenseLinesListScreen};
export {ExpenseListScreen};
export {ExpenseDetailsScreen};
export {ExpenseLineFormScreen};
