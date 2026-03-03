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
  createStandardFetch,
  createStandardSearch,
  getActionApi,
  getSearchCriterias,
  getTypes,
} from '@axelor/aos-mobile-core';

const createExpenseDraftCriteria = userId => {
  const Expense = getTypes().Expense;

  const criteria = [
    {
      fieldName: 'statusSelect',
      operator: '=',
      value: Expense?.statusSelect.Draft,
    },
  ];

  if (userId != null) {
    criteria.push({
      fieldName: 'employee.user.id',
      operator: '=',
      value: userId,
    });
  }
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
  const Expense = getTypes().Expense;

  const criteria = [
    getSearchCriterias('hr_expense', searchValue),
    {
      fieldName: 'statusSelect',
      operator: '=',
      value: Expense?.statusSelect.WaitingValidation,
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

export async function searchExpenseDraft({userId, companyId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.Expense',
    criteria: createExpenseDraftCriteria(userId),
    fieldKey: 'hr_expenseDraft',
    numberElementsByPage: null,
    page: 0,
    provider: 'model',
    companyId,
  });
}

export async function searchMyExpense({
  searchValue = null,
  page = 0,
  userId,
  companyId,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.Expense',
    criteria: createMyExpenseCriteria(searchValue, userId),
    fieldKey: 'hr_expense',
    sortKey: 'hr_expense',
    page,
    provider: 'model',
    companyId,
    filter: filterDomain,
  });
}

export async function searchExpenseToValidate({
  searchValue = null,
  page = 0,
  user,
  companyId,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.Expense',
    criteria: createExpenseToValidateCriteria(searchValue, user),
    fieldKey: 'hr_expense',
    sortKey: 'hr_expense',
    page,
    provider: 'model',
    companyId,
    filter: filterDomain,
  });
}

export async function getExpense({ExpenseId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.hr.db.Expense',
    id: ExpenseId,
    fieldKey: 'hr_expense',
    provider: 'model',
  });
}

export async function createExpense({expense}) {
  return getActionApi().send({
    url: 'ws/aos/expense/',
    method: 'post',
    body: expense,
    description: 'create expense',
  });
}

export async function quickCreateExpense() {
  return getActionApi().send({
    url: 'ws/aos/expense/quick-create',
    method: 'post',
    description: 'quick create expense',
  });
}

export async function updateExpense({expenseId, version, expenseLineIdList}) {
  return getActionApi().send({
    url: `ws/aos/expense/add-line/${expenseId}`,
    method: 'put',
    body: {
      version,
      expenseLineIdList,
    },
    description: 'update expense',
  });
}

export async function sendExpense({expenseId, version}) {
  return getActionApi().send({
    url: `ws/aos/expense/send/${expenseId}`,
    method: 'put',
    body: {
      version,
    },
    description: 'send expense',
  });
}

export async function validateExpense({expenseId, version}) {
  return getActionApi().send({
    url: `ws/aos/expense/validate/${expenseId}`,
    method: 'put',
    body: {
      version,
    },
    description: 'validate expense',
  });
}

export async function refuseExpense({expenseId, version, groundForRefusal}) {
  return getActionApi().send({
    url: `ws/aos/expense/refuse/${expenseId}`,
    method: 'put',
    body: {
      version,
      groundForRefusal,
    },
    description: 'refuse expense',
  });
}

export async function deleteExpense({expenseId}) {
  return getActionApi().send({
    url: `ws/rest/com.axelor.apps.hr.db.Expense/${expenseId}`,
    method: 'delete',
    description: 'delete expense',
    matchers: {
      modelName: 'com.axelor.apps.hr.db.Expense',
      id: expenseId,
    },
  });
}

export async function cancelExpense({expenseId, version}) {
  return getActionApi().send({
    url: `ws/aos/expense/cancel/${expenseId}`,
    method: 'put',
    body: {
      version,
    },
    description: 'cancel expense',
  });
}

export async function returnToDraftStatusExpense({expenseId, version}) {
  return getActionApi().send({
    url: `ws/aos/expense/draft/${expenseId}`,
    method: 'put',
    body: {
      version,
    },
    description: 'return expense to draft status',
  });
}
