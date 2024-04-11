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
  fromStockLocationId,
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

  if (fromStockLocationId != null) {
    criteria.push({
      fieldName: 'fromStockLocation.id',
      operator: '=',
      value: fromStockLocationId,
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

export async function searchDeliveryFilter({
  searchValue = null,
  fromStockLocationId,
  partnerId,
  statusList,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockMove',
    criteria: createSearchCriteria(
      searchValue,
      fromStockLocationId,
      partnerId,
      statusList,
    ),
    fieldKey: 'stock_customerDelivery',
    sortKey: 'stock_customerDelivery',
    page,
  });
}

export async function fetchCustomerDelivery({customerDeliveryId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.stock.db.StockMove',
    id: customerDeliveryId,
    fieldKey: 'stock_customerDelivery',
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
  return axiosApiProvider.post({
    url: `/ws/aos/stock-move/add-line/${stockMoveId}`,
    data: {
      productId: productId,
      unitId: unitId,
      trackingNumberId: trackingNumberId,
      expectedQty: expectedQty,
      realQty: realQty,
      conformity: StockMove.conformity.None,
      version: version,
      fromStockLocationId,
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
