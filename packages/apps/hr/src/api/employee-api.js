/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

const createEmployeeCriteria = searchValue => {
  return [getSearchCriterias('hr_employee', searchValue)];
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

export async function searchEmployee({searchValue = null, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.Employee',
    criteria: createEmployeeCriteria(searchValue),
    fieldKey: 'hr_employee',
    sortKey: 'hr_employee',
    page,
    provider: 'model',
  });
}
