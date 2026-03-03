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
  getActionApi,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createSearchCriteria = (internalMoveId, searchValue) => {
  return [
    {
      fieldName: 'stockMove.id',
      operator: '=',
      value: internalMoveId,
    },
    getSearchCriterias('stock_internalMoveLine', searchValue),
  ];
};

export async function searchInternalMoveLines({
  internalMoveId,
  searchValue,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockMoveLine',
    criteria: createSearchCriteria(internalMoveId, searchValue),
    fieldKey: 'stock_internalMoveLine',
    sortKey: 'stock_internalMoveLine',
    page,
    provider: 'model',
  });
}

export async function updateInternalMoveLine({
  stockMoveLineId,
  version,
  realQty,
  unitId,
  fromStockLocationId,
  toStockLocationId,
  description,
}) {
  return getActionApi().send({
    url: `/ws/aos/stock-move-line/${stockMoveLineId}`,
    method: 'put',
    body: {
      version,
      realQty,
      unitId,
      fromStockLocationId,
      toStockLocationId,
      description,
    },
    description: 'update internal move line qty',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.StockMoveLine',
      id: stockMoveLineId,
      fields: {
        unitId: 'unit.id',
        fromStockLocationId: 'fromStockLocation.id',
        toStockLocationId: 'toStockLocation.id',
        realQty,
        description,
      },
    },
  });
}

export async function fetchInternalMoveLine({internalMoveLineId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.stock.db.StockMoveLine',
    id: internalMoveLineId,
    fieldKey: 'stock_internalMoveLine',
    provider: 'model',
  });
}
