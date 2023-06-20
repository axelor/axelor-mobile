/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
  getActionApi,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createSearchCriteria = (customerDeliveryId, searchValue) => {
  return [
    {
      fieldName: 'stockMove.id',
      operator: '=',
      value: customerDeliveryId,
    },
    getSearchCriterias('stock_customerDeliveryLine', searchValue),
  ];
};

export async function searchCustomerDeliveryLines({
  page = 0,
  searchValue,
  customerDeliveryId,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockMoveLine',
    criteria: createSearchCriteria(customerDeliveryId, searchValue),
    fieldKey: 'stock_customerDeliveryLine',
    page,
    provider: 'model',
  });
}

export async function updateLine({
  stockMoveLineId,
  version,
  realQty,
  fromStockLocationId,
}) {
  return getActionApi().send({
    url: `/ws/aos/stock-move-line/${stockMoveLineId}`,
    method: 'put',
    body: {
      version,
      realQty,
      fromStockLocationId,
    },
    description: 'update customer delivery line qty',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.StockMoveLine',
      id: stockMoveLineId,
      fields: {},
    },
  });
}

export async function fetchCustomerDeliveryLine({customerDeliveryLineId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.stock.db.StockMoveLine',
    id: customerDeliveryLineId,
    fieldKey: 'stock_customerDeliveryLine',
    provider: 'model',
  });
}
