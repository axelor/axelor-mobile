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

const createCustomerOrderLineCriteria = (searchValue, customerSaleOrder) => {
  return [
    getSearchCriterias('quality_customerOrderLine', searchValue),
    {
      fieldName: 'saleOrder.id',
      operator: '=',
      value: customerSaleOrder.id,
    },
  ];
};

export async function searchCustomerOrderLine({
  page = 0,
  searchValue,
  customerSaleOrder,
}) {
  if (!customerSaleOrder) return undefined;

  return createStandardSearch({
    model: 'com.axelor.apps.sale.db.SaleOrderLine',
    criteria: createCustomerOrderLineCriteria(searchValue, customerSaleOrder),
    fieldKey: 'quality_customerOrderLine',
    sortKey: 'quality_customerOrderLine',
    page,
    provider: 'model',
  });
}
