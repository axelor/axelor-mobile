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

const createAlternativeBarcodeCriteria = searchValue => {
  const criteria = [getSearchCriterias('sale_alternativeBarcode', searchValue)];

  return criteria;
};

export async function searchAlternativeBarcode({page = 0, searchValue}) {
  if (searchValue == null) {
    return null;
  }
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.AlternativeBarcode',
    criteria: createAlternativeBarcodeCriteria(searchValue),
    fieldKey: 'sale_alternativeBarcode',
    sortKey: 'sale_alternativeBarcode',
    page,
    provider: 'model',
  });
}
