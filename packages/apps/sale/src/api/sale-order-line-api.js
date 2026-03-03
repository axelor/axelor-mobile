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
} from '@axelor/aos-mobile-core';

const createSaleOrderLineCriteria = saleOrderId => {
  return [
    {
      fieldName: 'saleOrder.id',
      operator: '=',
      value: saleOrderId,
    },
  ];
};

export async function fetchSaleOrderLine({saleOrderId, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.sale.db.SaleOrderLine',
    criteria: createSaleOrderLineCriteria(saleOrderId),
    fieldKey: 'sale_saleOrderLine',
    sortKey: 'sale_saleOrderLine',
    page,
    provider: 'model',
  });
}

export async function fetchSaleOrderLineById({saleOrderLineId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.sale.db.SaleOrderLine',
    id: saleOrderLineId,
    fieldKey: 'sale_saleOrderLine',
    provider: 'model',
  });
}
