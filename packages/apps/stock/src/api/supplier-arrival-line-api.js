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
  getActionApi,
  getSearchCriterias,
  getTypes,
} from '@axelor/aos-mobile-core';

const createSearchCriteria = (supplierArrivalId, searchValue) => {
  return [
    {
      fieldName: 'stockMove.id',
      operator: '=',
      value: supplierArrivalId,
    },
    getSearchCriterias('stock_supplierArrivalLine', searchValue),
  ];
};

export async function searchSupplierArrivalLines({
  supplierArrivalId,
  searchValue,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockMoveLine',
    criteria: createSearchCriteria(supplierArrivalId, searchValue),
    fieldKey: 'stock_supplierArrivalLine',
    sortKey: 'stock_supplierArrivalLine',
    page,
    provider: 'model',
  });
}

export async function updateLine({
  stockMoveLineId,
  version,
  realQty,
  conformity: _conformity,
  toStockLocationId,
  description,
}) {
  const StockMove = getTypes().StockMove;
  const conformity = _conformity ?? StockMove?.conformitySelect.None;

  return getActionApi().send({
    url: `/ws/aos/stock-move-line/${stockMoveLineId}`,
    method: 'put',
    body:
      conformity > StockMove?.conformitySelect.None
        ? {
            version,
            realQty,
            conformity,
            toStockLocationId,
            description,
          }
        : {
            version,
            realQty,
            toStockLocationId,
            description,
          },
    description: 'update supplier arrival line',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.StockMoveLine',
      id: stockMoveLineId,
      fields: {
        conformity: 'conformitySelect',
        realQty,
        toStockLocationId: 'toStockLocation.id',
        description,
      },
    },
  });
}

export async function fetchSupplierArrivalLine({supplierArrivalLineId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.stock.db.StockMoveLine',
    id: supplierArrivalLineId,
    fieldKey: 'stock_supplierArrivalLine',
    provider: 'model',
  });
}

export async function splitSupplierArrivalLine({id, version}) {
  return getActionApi().send({
    url: `ws/aos/stock-move-line/split/${id}`,
    method: 'put',
    body: {version},
    description: 'split supplier arrival line',
  });
}
