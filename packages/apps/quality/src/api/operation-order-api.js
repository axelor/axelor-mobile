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
  createStandardFetch,
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createOperationLineCriteria = (searchValue, manufOrder) => {
  return [
    getSearchCriterias('quality_operationOrder', searchValue),
    {fieldName: 'manufOrder.id', operator: '=', value: manufOrder.id},
  ];
};

export async function searchOperationLine({page = 0, searchValue, manufOrder}) {
  if (!manufOrder) return undefined;

  return createStandardSearch({
    model: 'com.axelor.apps.production.db.OperationOrder',
    criteria: createOperationLineCriteria(searchValue, manufOrder),
    fieldKey: 'quality_operationOrder',
    sortKey: 'quality_operationOrder',
    page,
    provider: 'model',
  });
}

export async function fetchOperationOrder({id}) {
  return createStandardFetch({
    model: 'com.axelor.apps.production.db.OperationOrder',
    id,
    fieldKey: 'quality_operationOrder',
    provider: 'model',
  });
}
