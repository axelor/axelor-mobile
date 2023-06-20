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
      value: StockMove.type.outgoing,
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
    getSearchCriterias('stock_customerDelivery', searchValue),
  ];
};

export async function searchDeliveryFilter({searchValue = null, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockMove',
    criteria: createSearchCriteria(searchValue),
    fieldKey: 'stock_customerDelivery',
    sortKey: 'stock_customerDelivery',
    page,
    provider: 'model',
  });
}

export async function fetchCustomerDelivery({customerDeliveryId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.stock.db.StockMove',
    id: customerDeliveryId,
    fieldKey: 'stock_customerDelivery',
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
  version,
  fromStockLocationId,
}) {
  return getActionApi().send({
    url: `/ws/aos/stock-move/add-line/${stockMoveId}`,
    method: 'post',
    body: {
      productId: productId,
      unitId: unitId,
      trackingNumberId: trackingNumberId,
      expectedQty: expectedQty,
      realQty: realQty,
      conformity: StockMove.conformity.None,
      version: version,
      fromStockLocationId,
    },
    description: 'add new customer delivery line',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.StockMoveLine',
      id: Date.now(),
      fields: {
        productId: 'product.id',
        unitId: 'unit.id',
        trackingNumberId: 'trackingNumber.id',
        qty: 'expectedQty',
        conformity: 'conformitySelect',
      },
    },
  });
}

export async function realizeSockMove({stockMoveId, version}) {
  return getActionApi().send({
    url: `/ws/aos/stock-move/realize/${stockMoveId}`,
    method: 'put',
    body: {
      version: version,
    },
    description: 'realize customer delivery',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.StockMove',
      id: stockMoveId,
      fields: {},
    },
  });
}
