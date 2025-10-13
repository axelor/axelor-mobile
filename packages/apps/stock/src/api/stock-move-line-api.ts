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
  createStandardSearch,
  Criteria,
  getActionApi,
  getSearchCriterias,
  getTypes,
} from '@axelor/aos-mobile-core';

export async function checkQuantity({
  stockMoveLineId,
}: {
  stockMoveLineId: number;
}) {
  return axiosApiProvider.get({
    url: `ws/aos/stock-move-line/check-quantity/${stockMoveLineId}`,
  });
}

const createSearchCriteria = (
  stockMoveId: number,
  scanValue?: string,
): Criteria[] => {
  return [
    {
      fieldName: 'stockMove.id',
      operator: '=',
      value: stockMoveId,
    },
    getSearchCriterias('stock_massStockMoveLine', scanValue),
  ];
};

export async function searchStockMoveLine({
  stockMoveId,
  scanValue,
  checkValidated = false,
  page = 0,
}: {
  stockMoveId: number;
  scanValue?: string;
  checkValidated?: boolean;
  page?: number;
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockMoveLine',
    criteria: createSearchCriteria(stockMoveId, scanValue),
    domain: checkValidated ? 'self.qty <= self.realQty' : undefined,
    fieldKey: 'stock_stockMoveLine',
    sortKey: 'stock_stockMoveLine',
    page,
    provider: 'model',
  });
}

export async function updateStockMoveLine({
  stockMoveLineId,
  version,
  realQty,
  unitId,
  fromStockLocationId,
  toStockLocationId,
  conformity: _conformity,
}: {
  stockMoveLineId: number;
  version: number;
  realQty: number;
  unitId?: number;
  fromStockLocationId?: number;
  toStockLocationId?: number;
  conformity?: number;
}) {
  const StockMove = getTypes().StockMove;
  const conformity = _conformity ?? StockMove?.conformitySelect.None;

  return getActionApi().send({
    url: `/ws/aos/stock-move-line/${stockMoveLineId}`,
    method: 'put',
    body: {
      version,
      realQty,
      unitId,
      fromStockLocationId,
      toStockLocationId,
      ...(conformity > StockMove?.conformitySelect.None ? {conformity} : {}),
    },
    description: 'update stock move line',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.StockMoveLine',
      id: stockMoveLineId,
      fields: {
        conformity: 'conformitySelect',
        unitId: 'unit.id',
        fromStockLocationId: 'fromStockLocation.id',
        toStockLocationId: 'toStockLocation.id',
      },
    },
  });
}
