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

const createProductCriteria = (searchValue, productIds) => {
  const criterias = [getSearchCriterias('quality_product', searchValue)];

  if (Array.isArray(productIds) && productIds?.length > 0) {
    criterias.push({
      fieldName: 'id',
      operator: 'in',
      value: productIds,
    });
  }

  return criterias;
};

export async function searchProduct({page = 0, searchValue, productIds}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Product',
    criteria: createProductCriteria(searchValue, productIds),
    fieldKey: 'quality_product',
    sortKey: 'quality_product',
    page,
    provider: 'model',
  });
}
