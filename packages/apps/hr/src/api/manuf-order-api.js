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

const createManufOrderCriteria = (searchValue, activeCompanyId) => {
  const criteria = [getSearchCriterias('hr_manufOrder', searchValue)];

  if (activeCompanyId != null) {
    criteria.push({
      fieldName: 'company.id',
      operator: '=',
      value: activeCompanyId,
    });
  }

  return criteria;
};

const createOperationOrderCriteria = (searchValue, manufOrderId) => {
  const criteria = [getSearchCriterias('hr_operationOrder', searchValue)];

  if (manufOrderId != null) {
    criteria.push({
      fieldName: 'manufOrder.id',
      operator: '=',
      value: manufOrderId,
    });
  }

  return criteria;
};

export async function searchManufOrder({
  searchValue,
  page = 0,
  activeCompanyId,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.production.db.ManufOrder',
    criteria: createManufOrderCriteria(searchValue, activeCompanyId),
    fieldKey: 'hr_manufOrder',
    sortKey: 'hr_manufOrder',
    page,
  });
}

export async function searchOperationOrder({
  searchValue,
  page = 0,
  manufOrderId,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.production.db.OperationOrder',
    criteria: createOperationOrderCriteria(searchValue, manufOrderId),
    fieldKey: 'hr_operationOrder',
    sortKey: 'hr_operationOrder',
    page,
  });
}
