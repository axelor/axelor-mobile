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
  axiosApiProvider,
  createStandardFetch,
  createStandardSearch,
  getSearchCriterias,
  getTypes,
} from '@axelor/aos-mobile-core';

const StockLocation = getTypes().StockLocation;
const StockMove = getTypes().StockMove;

const createSearchCriteria = (
  searchValue,
  fromStockLocationId,
  toStockLocationId,
  statusList,
) => {
  const criteria = [
    {
      fieldName: 'fromStockLocation.typeSelect',
      operator: '=',
      value: StockLocation?.typeSelect.internal,
    },
    {
      fieldName: 'toStockLocation.typeSelect',
      operator: '=',
      value: StockLocation?.typeSelect.internal,
    },
    {
      fieldName: 'typeSelect',
      operator: '=',
      value: StockMove?.typeSelect.internal,
    },
    getSearchCriterias('stock_internalMove', searchValue),
  ];

  if (fromStockLocationId != null) {
    criteria.push({
      fieldName: 'fromStockLocation.id',
      operator: '=',
      value: fromStockLocationId,
    });
  }

  if (toStockLocationId != null) {
    criteria.push({
      fieldName: 'toStockLocation.id',
      operator: '=',
      value: toStockLocationId,
    });
  }

  if (Array.isArray(statusList) && statusList.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: statusList.map(status => ({
        fieldName: 'statusSelect',
        operator: '=',
        value: status.key,
      })),
    });
  }

  return criteria;
};

export async function searchInternalMoveFilter({
  searchValue = null,
  fromStockLocationId,
  toStockLocationId,
  statusList,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockMove',
    criteria: createSearchCriteria(
      searchValue,
      fromStockLocationId,
      toStockLocationId,
      statusList,
    ),
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
  companyId,
  fromStockLocationId,
  toStockLocationId,
  lineItems,
}) {
  return axiosApiProvider.post({
    url: 'ws/aos/stock-move/internal/',
    data: {
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
