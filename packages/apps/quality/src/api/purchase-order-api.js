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

const createSupplierOrderCriteria = (searchValue, supplierPartner) => {
  return [
    getSearchCriterias('quality_supplierOrder', searchValue),
    {
      fieldName: 'supplierPartner.id',
      operator: '=',
      value: supplierPartner.id,
    },
  ];
};

export async function searchSupplierOrder({
  page = 0,
  searchValue,
  companyId,
  supplierPartner,
}) {
  if (!supplierPartner) return undefined;

  return createStandardSearch({
    model: 'com.axelor.apps.purchase.db.PurchaseOrder',
    criteria: createSupplierOrderCriteria(searchValue, supplierPartner),
    fieldKey: 'quality_supplierOrder',
    sortKey: 'quality_supplierOrder',
    page,
    provider: 'model',
    companyId,
  });
}
