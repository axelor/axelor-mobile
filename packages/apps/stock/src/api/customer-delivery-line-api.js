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
  getActionApi,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createSearchCriteria = (
  customerDeliveryId,
  searchValue,
  alternativeBarcodeList,
) => {
  const criteria = [
    {
      fieldName: 'stockMove.id',
      operator: '=',
      value: customerDeliveryId,
    },
    getSearchCriterias('stock_customerDeliveryLine', searchValue),
  ];

  if (
    Array.isArray(alternativeBarcodeList) &&
    alternativeBarcodeList.length > 0
  ) {
    criteria.push({
      fieldName: 'product.id',
      operator: 'in',
      value: alternativeBarcodeList.map(barcode => barcode.product.id),
    });
  }

  return criteria;
};

export async function searchCustomerDeliveryLines({
  page = 0,
  searchValue,
  customerDeliveryId,
  alternativeBarcodeList,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockMoveLine',
    criteria: createSearchCriteria(
      customerDeliveryId,
      searchValue,
      alternativeBarcodeList,
    ),
    fieldKey: 'stock_customerDeliveryLine',
    sortKey: 'stock_customerDeliveryLine',
    page,
    provider: 'model',
  });
}

export async function updateLine({
  stockMoveLineId,
  version,
  realQty,
  fromStockLocationId,
  description,
}) {
  return getActionApi().send({
    url: `/ws/aos/stock-move-line/${stockMoveLineId}`,
    method: 'put',
    body: {
      version,
      realQty,
      fromStockLocationId,
      description,
    },
    description: 'update customer delivery line qty',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.StockMoveLine',
      id: stockMoveLineId,
      fields: {
        fromStockLocationId: 'fromStockLocation.id',
        realQty,
        description,
      },
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

export async function splitCustomerDeliveryLine({id, version}) {
  return getActionApi().send({
    url: `ws/aos/stock-move-line/split/${id}`,
    method: 'put',
    body: {version},
    description: 'split customer delivery line',
  });
}
