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
  Criteria,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createPackagingProductCriteria = (searchValue?: string): Criteria[] => {
  return [
    getSearchCriterias('stock_product', searchValue),
    {
      fieldName: 'isModel',
      operator: '=',
      value: false,
    },
    {
      fieldName: 'productTypeSelect',
      operator: '=',
      value: 'storable',
    },
    {
      fieldName: 'dtype',
      operator: '=',
      value: 'Product',
    },
    {
      fieldName: 'isPackaging',
      operator: '=',
      value: true,
    },
  ];
};

export async function fetchPackagingProducts({
  searchValue,
  page = 0,
}: {
  searchValue?: string;
  page?: number;
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Product',
    criteria: createPackagingProductCriteria(searchValue),
    fieldKey: 'stock_product',
    sortKey: 'stock_product',
    page,
    provider: 'model',
  });
}
