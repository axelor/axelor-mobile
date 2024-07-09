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
import StockLocation from '../types/stock-location';
import StockMove from '../types/stock-move';

const createSearchCriteria = searchValue => {
  return [
    {
      fieldName: 'fromStockLocation.typeSelect',
      operator: '=',
      value: StockLocation.type.internal,
    },
    {
      fieldName: 'toStockLocation.typeSelect',
      operator: '=',
      value: StockLocation.type.internal,
    },
    {
      fieldName: 'typeSelect',
      operator: '=',
      value: StockMove.type.internal,
    },
    getSearchCriterias('stock_internalMove', searchValue),
  ];
};

export async function searchInternalMoveFilter({searchValue = null, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockMove',
    criteria: createSearchCriteria(searchValue),
    fieldKey: 'stock_internalMove',
    sortKey: 'stock_internalMove',
    page,
    provider: 'model',
  });
}

export async function fetchInternalMove({internalMoveId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.stock.db.StockMove',
    id: internalMoveId,
    fieldKey: 'stock_internalMove',
    provider: 'model',
  });
}

export async function createInternalStockMove({
  companyId,
  fromStockLocationId,
  toStockLocationId,
  lineItems,
}) {
  return getActionApi().send({
    url: 'ws/aos/stock-move/internal/',
    method: 'post',
    body: {
      companyId,
      fromStockLocationId,
      toStockLocationId,
      lineList: lineItems?.map(_item => ({
        productId: _item.product?.id,
        trackingNumberId: _item.trackingNumber?.id,
        unitId: _item.unit?.id,
        realQty: _item.realQty,
        fromStockLocationId: _item.fromStockLocation?.id,
        toStockLocationId: _item.toStockLocation?.id,
      })),
    },
    description: 'create internal move',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.StockMove',
      id: null,
      fields: {},
    },
  });
}

export async function realizeInternalMove({stockMoveId, version}) {
  return getActionApi().send({
    url: `/ws/aos/stock-move/realize/${stockMoveId}`,
    method: 'put',
    body: {
      version,
    },
    description: 'realize internal move',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.StockMove',
      id: stockMoveId,
      fields: {},
    },
  });
}

export async function modifyInternalMoveNotes({
  internalMoveId,
  version,
  notes,
}) {
  return getActionApi().send({
    url: `/ws/rest/com.axelor.apps.stock.db.StockMove/${internalMoveId}`,
    method: 'post',
    body: {
      version,
      note: notes,
    },
    description: 'modify internal move notes',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.StockMove',
      id: internalMoveId,
      fields: {},
    },
  });
}
