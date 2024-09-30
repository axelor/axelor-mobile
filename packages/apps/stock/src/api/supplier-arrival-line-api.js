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
    page,
  });
}

export async function updateLine({
  stockMoveLineId,
  version,
  realQty,
  conformity: _conformity,
  toStockLocationId,
}) {
  const StockMove = getTypes().StockMove;
  const conformity = _conformity ?? StockMove?.conformitySelect.None;

  return axiosApiProvider.put({
    url: `/ws/aos/stock-move-line/${stockMoveLineId}`,
    data:
      conformity > StockMove?.conformitySelect.None
        ? {
            version,
            realQty,
            conformity,
            toStockLocationId,
          }
        : {
            version,
            realQty,
            toStockLocationId,
          },
  });
}

export async function fetchSupplierArrivalLine({supplierArrivalLineId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.stock.db.StockMoveLine',
    id: supplierArrivalLineId,
    fieldKey: 'stock_supplierArrivalLine',
  });
}

export async function splitSupplierArrivalLine({id, version}) {
  return axiosApiProvider.put({
    url: `ws/aos/stock-move-line/split/${id}`,
    data: {version},
  });
}
