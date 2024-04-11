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
} from '@axelor/aos-mobile-core';
import StockMove from '../types/stock-move';

const createSearchCriteria = (
  searchValue,
  toStockLocationId,
  partnerId,
  statusList,
) => {
  const criteria = [
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

  if (toStockLocationId != null) {
    criteria.push({
      fieldName: 'toStockLocation.id',
      operator: '=',
      value: toStockLocationId,
    });
  }

  if (partnerId != null) {
    criteria.push({
      fieldName: 'partner.id',
      operator: '=',
      value: partnerId,
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

export async function searchSupplierArrivalFilter({
  searchValue,
  toStockLocationId,
  partnerId,
  statusList,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockMove',
    criteria: createSearchCriteria(
      searchValue,
      toStockLocationId,
      partnerId,
      statusList,
    ),
    fieldKey: 'stock_supplierArrival',
    sortKey: 'stock_supplierArrival',
    page,
  });
}

export async function fetchSupplierArrival({supplierArrivalId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.stock.db.StockMove',
    id: supplierArrivalId,
    fieldKey: 'stock_supplierArrival',
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
  return axiosApiProvider.post({
    url: `/ws/aos/stock-move/add-line/${stockMoveId}`,
    data: {
      productId: productId,
      unitId: unitId,
      trackingNumberId: trackingNumberId,
      expectedQty: expectedQty,
      realQty: realQty,
      conformity: conformity,
      version,
      toStockLocationId,
    },
  });
}

export async function realizeSockMove({stockMoveId, version}) {
  return axiosApiProvider.put({
    url: `/ws/aos/stock-move/realize/${stockMoveId}`,
    data: {
      version: version,
    },
  });
}
