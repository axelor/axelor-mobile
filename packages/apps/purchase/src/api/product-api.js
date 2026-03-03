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
  getNowDateZonesISOString,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createProductCriteria = ({searchValue}) => {
  const criterias = [
    getSearchCriterias('purchase_product', searchValue),
    {
      fieldName: 'isModel',
      operator: '=',
      value: false,
    },
    {
      fieldName: 'expense',
      operator: '=',
      value: false,
    },
    {
      operator: 'or',
      criteria: [
        {
          fieldName: 'endDate',
          operator: 'isNull',
        },
        {
          fieldName: 'endDate',
          operator: '>',
          value: getNowDateZonesISOString().split('T')[0],
        },
      ],
    },
    {
      fieldName: 'purchasable',
      operator: '=',
      value: true,
    },
    {
      fieldName: 'dtype',
      operator: '=',
      value: 'Product',
    },
  ];

  return criterias;
};

export async function searchProduct({page = 0, searchValue}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Product',
    criteria: createProductCriteria({searchValue}),
    fieldKey: 'purchase_product',
    sortKey: 'purchase_product',
    page,
    provider: 'model',
  });
}
