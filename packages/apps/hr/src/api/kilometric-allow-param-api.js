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

const createKilometricAllowParamCriteria = (searchValue, idList) => {
  const criteria = [
    getSearchCriterias('hr_kilomectricAllowParam', searchValue),
  ];

  if (Array.isArray(idList)) {
    criteria.push({
      fieldName: 'id',
      operator: 'in',
      value: idList,
    });
  }

  return criteria;
};

export async function searchKilometricAllowParam({
  searchValue = null,
  page = 0,
  idList = [],
}) {
  if (!Array.isArray(idList) || idList.length === 0) {
    return [];
  }

  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.KilometricAllowParam',
    criteria: createKilometricAllowParamCriteria(searchValue, idList),
    fieldKey: 'hr_kilomectricAllowParam',
    sortKey: 'hr_kilomectricAllowParam',
    page,
    provider: 'model',
  });
}
