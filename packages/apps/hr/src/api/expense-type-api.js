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
} from '@axelor/aos-mobile-core';

const createExpenseType = searchValue => {
  const criteria = [
    {
      fieldName: 'isModel',
      operator: '=',
      value: false,
    },
    {
      fieldName: 'expense',
      operator: '=',
      value: true,
    },
    {
      fieldName: 'dtype',
      operator: '=',
      value: 'Product',
    },
    getSearchCriterias('hr_expenseType', searchValue),
  ];

  return criteria;
};

export async function searchExpenseType({searchValue = null, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Product',
    criteria: createExpenseType(searchValue),
    fieldKey: 'hr_expenseType',
    sortKey: 'hr_expenseType',
    page,
  });
}
