/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import {axiosApiProvider, getObjectFields} from '@axelor/aos-mobile-core';
import StockLocation from '../types/stock-location';
import StockMove from '../types/stock-move';

const sortByFields = [
  'statusSelect',
  '-realDate',
  'estimatedDate',
  'stockMoveSeq',
];

const createSearchCriteria = searchValue => {
  const criteria = [];
  criteria.push({
    fieldName: 'fromStockLocation.typeSelect',
    operator: '=',
    value: StockLocation.type.internal,
  });
  criteria.push({
    fieldName: 'toStockLocation.typeSelect',
    operator: '=',
    value: StockLocation.type.internal,
  });
  criteria.push({
    fieldName: 'typeSelect',
    operator: '=',
    value: StockMove.type.internal,
  });

  if (searchValue != null) {
    criteria.push({
      fieldName: 'stockMoveSeq',
      operator: 'like',
      value: searchValue,
    });
  }
  return criteria;
};

export async function searchInternalMoveFilter({searchValue = null, page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.stock.db.StockMove/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: createSearchCriteria(searchValue),
          },
        ],
      },
      fields: getObjectFields('stock_internalMove'),
      sortBy: sortByFields,
      limit: 10,
      offset: 10 * page,
    },
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

export async function updateInternalStockMove({
  internalMoveId,
  version,
  movedQty,
  unitId,
  status,
}) {
  return axiosApiProvider.put({
    url: `/ws/aos/stock-move/internal/${internalMoveId}`,
    data: {
      version: version,
      movedQty: movedQty,
      unitId: unitId,
      status: status,
    },
  });
}
