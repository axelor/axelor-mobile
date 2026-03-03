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
  createStandardFetch,
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createManufOrderCriteria = searchValue => {
  return [getSearchCriterias('quality_manufacturingOrder', searchValue)];
};

export async function searchManufOrder({page = 0, searchValue, companyId}) {
  return createStandardSearch({
    model: 'com.axelor.apps.production.db.ManufOrder',
    criteria: createManufOrderCriteria(searchValue),
    fieldKey: 'quality_manufacturingOrder',
    sortKey: 'quality_manufacturingOrder',
    page,
    provider: 'model',
    companyId,
  });
}

const createBoMLinesCriteria = (bomId, searchValue) => {
  return [
    getSearchCriterias('quality_billOfMaterialLine', searchValue),
    {
      fieldName: 'billOfMaterialParent.id',
      operator: '=',
      value: bomId,
    },
  ];
};

export async function searchBoMLines({bomId, page, searchValue}) {
  return createStandardSearch({
    model: 'com.axelor.apps.production.db.BillOfMaterialLine',
    criteria: createBoMLinesCriteria(bomId, searchValue),
    fieldKey: 'quality_billOfMaterialLine',
    sortKey: 'quality_billOfMaterialLine',
    page: page ?? 0,
    numberElementsByPage: !page ? null : undefined,
    provider: 'model',
  });
}

export async function fetchManufOrder({id}) {
  return createStandardFetch({
    model: 'com.axelor.apps.production.db.ManufOrder',
    id,
    fieldKey: 'quality_manufacturingOrder',
    provider: 'model',
  });
}
