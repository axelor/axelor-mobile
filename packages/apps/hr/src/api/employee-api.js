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
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createManagedEmployeeCriteria = userId => {
  const criteria = [
    {
      fieldName: 'managerUser.id',
      operator: '=',
      value: userId,
    },
  ];

  return criteria;
};

const createEmployeeCriteria = (searchValue, hireDate, payCompany) => {
  const criteria = [
    getSearchCriterias('hr_employee', searchValue),
    {fieldName: 'user.blocked', operator: '=', value: false},
    {
      operator: 'or',
      criteria: [
        {fieldName: 'user.expiresOn', operator: 'isNull'},
        {
          fieldName: 'user.expiresOn',
          operator: '>=',
          value: new Date().toISOString().split('T')[0],
        },
      ],
    },
  ];

  if (hireDate != null) {
    criteria.push({fieldName: 'hireDate', operator: '<=', value: hireDate});
  }

  if (payCompany != null) {
    criteria.push({
      fieldName: 'mainEmploymentContract.payCompany',
      operator: '=',
      value: payCompany,
    });
  }

  return criteria;
};

export async function searchManagedEmployee({userId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.Employee',
    criteria: createManagedEmployeeCriteria(userId),
    fieldKey: 'hr_employee',
    numberElementsByPage: 1,
    page: 0,
    provider: 'model',
  });
}

export async function searchEmployee({
  page = 0,
  searchValue = null,
  hireDate,
  payCompany,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.Employee',
    criteria: createEmployeeCriteria(searchValue, hireDate, payCompany),
    fieldKey: 'hr_employee',
    sortKey: 'hr_employee',
    page,
    provider: 'model',
  });
}
