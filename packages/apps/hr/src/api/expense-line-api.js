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

import {
  axiosApiProvider,
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createExpenseLineSearchCriteria = searchValue => {
  return [getSearchCriterias('hr_expenseLines', searchValue)];
};

const createExpenseLinesCriteria = (searchValue, userId) => {
  const criteria = createExpenseLineSearchCriteria(searchValue);

  if (userId != null) {
    criteria.push({
      operator: 'and',
      criteria: [
        {
          fieldName: 'employee.user.id',
          operator: '=',
          value: userId,
        },
        {
          fieldName: 'expense',
          operator: 'isNull',
        },
      ],
    });
  }

  return criteria;
};

const createExpenseLineCriteria = (searchValue, expenseId) => {
  const criteria = createExpenseLineSearchCriteria(searchValue);

  if (expenseId != null) {
    criteria.push({
      fieldName: 'expense.id',
      operator: '=',
      value: expenseId,
    });
  }

  return criteria;
};

const createGeneralExpenseLineCriteria = (searchValue, expenseId) => {
  const criteria = createExpenseLineCriteria(searchValue, expenseId);

  criteria.push({
    fieldName: 'generalExpense',
    operator: 'notNull',
  });

  return criteria;
};

const createKilomectricExpenseLineCriteria = (searchValue, expenseId) => {
  const criteria = createExpenseLineCriteria(searchValue, expenseId);

  criteria.push({
    fieldName: 'kilometricExpense',
    operator: 'notNull',
  });

  return criteria;
};

export async function searchExpenseLines({
  searchValue = null,
  userId,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.ExpenseLine',
    criteria: createExpenseLinesCriteria(searchValue, userId),
    fieldKey: 'hr_expenseLines',
    sortKey: 'hr_expenseLines',
    page,
  });
}

export async function searchGeneralExpenseLines({
  searchValue = null,
  expenseId,
  page,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.ExpenseLine',
    criteria: createGeneralExpenseLineCriteria(searchValue, expenseId),
    fieldKey: 'hr_expenseLines',
    page: page,
  });
}

export async function searchKilometricExpenseLines({
  searchValue = null,
  expenseId,
  page,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.ExpenseLine',
    criteria: createKilomectricExpenseLineCriteria(searchValue, expenseId),
    fieldKey: 'hr_expenseLines',
    page: page,
  });
}

export async function createExpenseLine({expenseLine}) {
  return axiosApiProvider.post({
    url: 'ws/aos/expense-line/',
    data: expenseLine,
  });
}

export async function updateExpenseLine({expenseLine}) {
  return axiosApiProvider.put({
    url: `ws/aos/expense-line/update/${expenseLine.id}`,
    data: expenseLine,
  });
}

export async function deleteExpenseLine({ExpenseLineId}) {
  return axiosApiProvider.delete({
    url: `ws/rest/com.axelor.apps.hr.db.ExpenseLine/${ExpenseLineId}`,
  });
}
