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

import {
  createStandardSearch,
  getSearchCriterias,
  createStandardFetch,
  axiosApiProvider,
} from '@axelor/aos-mobile-core';
import {Expense} from '../types';

const createExpenseDraftCriteria = () => {
  const criteria = [
    {
      fieldName: 'statusSelect',
      operator: '=',
      value: Expense.statusSelect.Draft,
    },
  ];
  return criteria;
};

const createMyExpenseCriteria = (searchValue, userId) => {
  const criteria = [getSearchCriterias('hr_expense', searchValue)];

  if (userId != null) {
    criteria.push({
      fieldName: 'employee.user.id',
      operator: '=',
      value: userId,
    });
  }

  return criteria;
};

const createExpenseToValidateCriteria = (searchValue, user) => {
  const criteria = [
    getSearchCriterias('hr_expense', searchValue),
    {
      fieldName: 'statusSelect',
      operator: '=',
      value: Expense.statusSelect.WaitingValidation,
    },
  ];

  if (!user?.employee?.hrManager) {
    criteria.push({
      fieldName: 'employee.managerUser.id',
      operator: '=',
      value: user?.id,
    });
  }

  return criteria;
};

export async function searchExpenseDraft() {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.Expense',
    criteria: createExpenseDraftCriteria(),
    fieldKey: 'hr_expenseDraft',
    numberElementsByPage: null,
    page: 0,
  });
}

export async function searchMyExpense({searchValue = null, page = 0, userId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.Expense',
    criteria: createMyExpenseCriteria(searchValue, userId),
    fieldKey: 'hr_expense',
    sortKey: 'hr_expense',
    page,
  });
}

export async function searchExpenseToValidate({
  searchValue = null,
  page = 0,
  user,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.Expense',
    criteria: createExpenseToValidateCriteria(searchValue, user),
    fieldKey: 'hr_expense',
    sortKey: 'hr_expense',
    page,
  });
}

export async function getExpense({ExpenseId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.hr.db.Expense',
    id: ExpenseId,
    fieldKey: 'hr_expense',
  });
}

export async function createExpense({expense}) {
  return axiosApiProvider.post({
    url: 'ws/aos/expense/',
    data: expense,
  });
}
