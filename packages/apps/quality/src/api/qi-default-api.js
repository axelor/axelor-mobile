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

const createDefectCriteria = (searchValue, typeFieldName) => {
  const criterias = [getSearchCriterias('quality_qiDefault', searchValue)];

  if (typeFieldName) {
    criterias.push({
      fieldName: typeFieldName,
      operator: '=',
      value: true,
    });
  }

  return criterias;
};

export async function searchDefect({page = 0, searchValue, companyId, type}) {
  return createStandardSearch({
    model: 'com.axelor.apps.quality.db.QIDefault',
    criteria: createDefectCriteria(searchValue, type),
    fieldKey: 'quality_qiDefault',
    sortKey: 'quality_qiDefault',
    page,
    provider: 'model',
    companyId,
  });
}
