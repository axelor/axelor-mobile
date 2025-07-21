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
  formatRequestBody,
  getActionApi,
  getSearchCriterias,
  getTypes,
} from '@axelor/aos-mobile-core';

const createSearchCriteria = (
  searchValue,
  fromStockLocationId,
  toStockLocationId,
  statusList,
) => {
  const StockLocation = getTypes().StockLocation;
  const StockMove = getTypes().StockMove;

  const criteria = [
    {
      fieldName: 'fromStockLocation.typeSelect',
      operator: 'in',
      value: [
        StockLocation?.typeSelect.internal,
        StockLocation?.typeSelect.external,
      ],
    },
    {
      fieldName: 'toStockLocation.typeSelect',
      operator: 'in',
      value: [
        StockLocation?.typeSelect.internal,
        StockLocation?.typeSelect.external,
      ],
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
  companyId,
  page = 0,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockMove',
    companyId,
    criteria: createSearchCriteria(
      searchValue,
      fromStockLocationId,
      toStockLocationId,
      statusList,
    ),
    fieldKey: 'stock_internalMove',
    sortKey: 'stock_internalMove',
    page,
    provider: 'model',
    filter: filterDomain,
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
  });
}

export async function modifyInternalMoveNotes({
  internalMoveId,
  version,
  notes,
}) {
  const {matchers, formattedData} = formatRequestBody(
    {
      note: notes,
      version,
    },
    'data',
  );

  return getActionApi().send({
    url: `/ws/rest/com.axelor.apps.stock.db.StockMove/${internalMoveId}`,
    method: 'post',
    body: {data: formattedData},
    description: 'modify internal move notes',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.StockMove',
      id: internalMoveId,
      fields: matchers,
    },
  });
}
