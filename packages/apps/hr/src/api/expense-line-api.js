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

import {
  createStandardSearch,
  getActionApi,
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

const createNumberExpenseLineByDateCriteria = (userId, date) => {
  const criteria = createExpenseLinesCriteria(null, userId);

  criteria.push({
    fieldName: 'expenseDate',
    operator: '=',
    value: date,
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
    provider: 'model',
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
    provider: 'model',
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
    provider: 'model',
  });
}

export async function getNumberExpenseLineByDate({userId, date}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.ExpenseLine',
    criteria: createNumberExpenseLineByDateCriteria(userId, date),
    fieldKey: 'hr_expenseLines',
    numberElementsByPage: null,
    page: 0,
    provider: 'model',
  });
}

export async function createExpenseLine({expenseLine}) {
  return getActionApi().send({
    url: 'ws/aos/expense-line/',
    method: 'post',
    body: expenseLine,
    description: 'create expense line',
  });
}

export async function updateExpenseLine({expenseLine}) {
  return getActionApi().send({
    url: `ws/aos/expense-line/update/${expenseLine.id}`,
    method: 'put',
    body: expenseLine,
    description: 'update expense line',
  });
}

export async function deleteExpenseLine({expenseLineId}) {
  return getActionApi().send({
    url: `ws/rest/com.axelor.apps.hr.db.ExpenseLine/${expenseLineId}`,
    method: 'delete',
    description: 'delete expense line',
    matchers: {
      modelName: 'com.axelor.apps.hr.db.ExpenseLine',
      id: expenseLineId,
    },
  });
}
