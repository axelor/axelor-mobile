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
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createSearchCriteria = (searchValue, isSupplier) => {
  const criteria = [
    {
      fieldName: 'isContact',
      operator: '=',
      value: false,
    },
    getSearchCriterias('stock_partner', searchValue),
  ];

  if (isSupplier) {
    criteria.push({
      fieldName: 'isSupplier',
      operator: '=',
      value: true,
    });
  } else {
    criteria.push({
      operator: 'or',
      criteria: [
        {
          fieldName: 'isCustomer',
          operator: '=',
          value: true,
        },
        {
          fieldName: 'isProspect',
          operator: '=',
          value: true,
        },
      ],
    });
  }

  return criteria;
};

export async function searchSuppliersFilter({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createSearchCriteria(searchValue, true),
    fieldKey: 'stock_partner',
    page,
    provider: 'model',
  });
}

export async function searchClientsFilter({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createSearchCriteria(searchValue, false),
    fieldKey: 'stock_partner',
    page,
    provider: 'model',
  });
}
