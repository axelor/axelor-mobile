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

const createPurchaseOrderLineCriteria = (searchValue, purchaseOrder) => {
  return [
    getSearchCriterias('quality_supplierOrderLine', searchValue),
    {
      fieldName: 'purchaseOrder.id',
      operator: '=',
      value: purchaseOrder.id,
    },
  ];
};

export async function searchSupplierPurchaseOrderLine({
  page = 0,
  searchValue,
  purchaseOrder,
}) {
  if (!purchaseOrder) return undefined;

  return createStandardSearch({
    model: 'com.axelor.apps.purchase.db.PurchaseOrderLine',
    criteria: createPurchaseOrderLineCriteria(searchValue, purchaseOrder),
    fieldKey: 'quality_supplierOrderLine',
    sortKey: 'quality_supplierOrderLine',
    page,
    provider: 'model',
  });
}
