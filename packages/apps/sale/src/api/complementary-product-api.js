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

const createComplementaryProductCriteria = (searchValue, productId) => {
  return [
    {
      fieldName: 'originalProduct.id',
      operator: '=',
      value: productId,
    },
    getSearchCriterias('sale_complementaryProduct', searchValue),
  ];
};

export async function fetchComplementaryProduct({
  searchValue,
  productId,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.sale.db.ComplementaryProduct',
    criteria: createComplementaryProductCriteria(searchValue, productId),
    fieldKey: 'sale_complementaryProduct',
    sortKey: 'sale_complementaryProduct',
    page,
    provider: 'model',
  });
}
