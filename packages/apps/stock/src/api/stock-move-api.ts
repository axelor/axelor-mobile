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
  createStandardSearch,
  Criteria,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

function createStockMoveCriterias(
  searchValue: string,
  stockMoveIds: number[],
): Criteria[] {
  return [
    getSearchCriterias('stock_stockMove', searchValue),
    {fieldName: 'id', operator: 'in', value: stockMoveIds ?? []},
  ];
}

export async function searchStockMove({
  page = 0,
  searchValue,
  stockMoveIds,
}: {
  page?: number;
  searchValue?: string;
  stockMoveIds: number[];
}) {
  if (!Array.isArray(stockMoveIds) || stockMoveIds.length === 0)
    return {data: {data: []}};

  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockMove',
    criteria: createStockMoveCriterias(searchValue, stockMoveIds),
    fieldKey: 'stock_stockMove',
    sortKey: 'stock_stockMove',
    page,
    provider: 'model',
  });
}
