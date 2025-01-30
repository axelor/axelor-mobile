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
  axiosApiProvider,
  createStandardFetch,
  createStandardSearch,
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
  });
}

export async function fetchInternalMove({internalMoveId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.stock.db.StockMove',
    id: internalMoveId,
    fieldKey: 'stock_internalMove',
  });
}

export async function createInternalStockMove({
  productId,
  companyId,
  originStockLocationId,
  destStockLocationId,
  unitId,
  trackingNumberId,
  movedQty,
}) {
  return axiosApiProvider.post({
    url: 'ws/aos/stock-move/internal/',
    data: {
      productId: productId,
      companyId: companyId,
      originStockLocationId: originStockLocationId,
      destStockLocationId: destStockLocationId,
      unitId: unitId,
      trackingNumberId: trackingNumberId,
      movedQty: movedQty,
    },
  });
}

export async function realizeInternalMove({stockMoveId, version}) {
  return axiosApiProvider.put({
    url: `/ws/aos/stock-move/realize/${stockMoveId}`,
    data: {
      version: version,
    },
  });
}

export async function modifyInternalMoveNotes({
  internalMoveId,
  version,
  notes,
}) {
  return axiosApiProvider.post({
    url: `/ws/rest/com.axelor.apps.stock.db.StockMove/${internalMoveId}`,
    data: {
      data: {
        version: version,
        note: notes,
      },
    },
  });
}
