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
import StockMove from '../types/stock-move';

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
  conformity = StockMove.conformity.None,
}) {
  return axiosApiProvider.put({
    url: `/ws/aos/stock-move-line/${stockMoveLineId}`,
    data:
      conformity > StockMove.conformity.None
        ? {
            version: version,
            realQty: realQty,
            conformity: conformity,
          }
        : {
            version: version,
            realQty: realQty,
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
