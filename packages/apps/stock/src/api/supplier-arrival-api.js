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
import StockMove from '../types/stock-move';

const createSearchCriteria = searchValue => {
  return [
    {
      fieldName: 'isReversion',
      operator: '=',
      value: false,
    },
    {
      fieldName: 'typeSelect',
      operator: '=',
      value: StockMove.type.incoming,
    },
    {
      operator: 'OR',
      criteria: [
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: StockMove.status.Planned,
        },
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: StockMove.status.Realized,
        },
      ],
    },
    getSearchCriterias('stock_supplierArrival', searchValue),
  ];
};

export async function searchSupplierArrivalFilter({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockMove',
    criteria: createSearchCriteria(searchValue),
    fieldKey: 'stock_supplierArrival',
    sortKey: 'stock_supplierArrival',
    page,
    provider: 'model',
  });
}

export async function fetchSupplierArrival({supplierArrivalId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.stock.db.StockMove',
    id: supplierArrivalId,
    fieldKey: 'stock_supplierArrival',
    provider: 'model',
  });
}

export async function addLineStockMove({
  stockMoveId,
  productId,
  unitId,
  trackingNumberId,
  expectedQty,
  realQty,
  conformity = StockMove.conformity.None,
  version,
  toStockLocationId,
}) {
  return getActionApi().send({
    url: `/ws/aos/stock-move/add-line/${stockMoveId}`,
    method: 'post',
    body: {
      productId,
      unitId,
      trackingNumberId,
      expectedQty,
      realQty,
      conformity,
      version,
      toStockLocationId,
    },
    description: 'add new supplier arrival line',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.StockMoveLine',
      id: Date.now(),
      fields: {
        productId: 'product.id',
        unitId: 'unit.id',
        trackingNumberId: 'trackingNumber.id',
        qty: 'expectedQty',
        realQty,
        conformity: 'conformitySelect',
        toStockLocationId: 'toStockLocation.id',
      },
    },
  });
}

export async function realizeSockMove({stockMoveId, version}) {
  return getActionApi().send({
    url: `/ws/aos/stock-move/realize/${stockMoveId}`,
    method: 'put',
    body: {
      version,
    },
    description: 'realize sipplier arrival',
  });
}
