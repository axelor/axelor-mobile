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
  getTypes,
} from '@axelor/aos-mobile-core';

const createSearchCriteria = (
  searchValue,
  toStockLocationId,
  partnerId,
  statusList,
) => {
  const StockMove = getTypes().StockMove;

  const criteria = [
    {
      fieldName: 'isReversion',
      operator: '=',
      value: false,
    },
    {
      fieldName: 'typeSelect',
      operator: '=',
      value: StockMove?.typeSelect.incoming,
    },
    {
      operator: 'OR',
      criteria: [
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: StockMove?.statusSelect.Planned,
        },
        {
          fieldName: 'statusSelect',
          operator: '=',
          value: StockMove?.statusSelect.Realized,
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
  companyId,
  page = 0,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockMove',
    companyId,
    criteria: createSearchCriteria(
      searchValue,
      toStockLocationId,
      partnerId,
      statusList,
    ),
    fieldKey: 'stock_supplierArrival',
    sortKey: 'stock_supplierArrival',
    page,
    provider: 'model',
    filter: filterDomain,
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
  conformity,
  version,
  toStockLocationId,
  description,
}) {
  const StockMove = getTypes().StockMove;

  return getActionApi().send({
    url: `/ws/aos/stock-move/add-line/${stockMoveId}`,
    method: 'post',
    body: {
      productId,
      unitId,
      trackingNumberId,
      expectedQty,
      realQty,
      conformity: conformity ?? StockMove?.conformitySelect.None,
      version,
      toStockLocationId,
      description,
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
        description,
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
