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
  getTypes,
} from '@axelor/aos-mobile-core';

type SearchStockMoveCriteriaParams = {
  searchValue?: string;
  stockMoveIds?: number[];
  partnerId?: number;
  isExclusion?: boolean;
  allowInternalMoves?: boolean;
  logisticalFormId?: number;
  stockLocationId?: number;
};

type SearchStockMoveParams = SearchStockMoveCriteriaParams & {
  page?: number;
  companyId?: number;
};

const createTypeCriteria = (
  partnerId: number,
  allowInternalMoves: boolean = false,
): Criteria[] => {
  const StockMove = getTypes().StockMove;

  const criteria: Criteria[] = [];

  if (allowInternalMoves) {
    criteria.push({
      fieldName: 'typeSelect',
      operator: '=',
      value: StockMove?.typeSelect.internal,
    });
  }

  if (partnerId != null) {
    criteria.push({
      operator: 'and',
      criteria: [
        {
          fieldName: 'typeSelect',
          operator: '=',
          value: StockMove?.typeSelect.outgoing,
        },
        {
          fieldName: 'partner.id',
          operator: '=',
          value: partnerId,
        },
      ],
    });
  } else {
    criteria.push({
      fieldName: 'typeSelect',
      operator: '=',
      value: StockMove?.typeSelect.outgoing,
    });
  }

  return criteria;
};

const createSearchCriteria = ({
  searchValue,
  stockMoveIds,
  partnerId,
  isExclusion = false,
  allowInternalMoves,
  logisticalFormId,
  stockLocationId,
}: SearchStockMoveCriteriaParams): Criteria[] => {
  const StockMove = getTypes().StockMove;

  const criteria: Criteria[] = [
    {
      fieldName: 'statusSelect',
      operator: '=',
      value: StockMove?.statusSelect.Planned,
    },
    getSearchCriterias('stock_stockMove', searchValue),
    {
      operator: 'or',
      criteria: createTypeCriteria(partnerId, allowInternalMoves),
    },
  ];

  if (Array.isArray(stockMoveIds) && stockMoveIds.length > 0) {
    criteria.push({
      operator: isExclusion ? 'not' : 'and',
      criteria: [{fieldName: 'id', operator: 'in', value: stockMoveIds}],
    });
  }

  if (isExclusion) {
    criteria.push({
      fieldName: 'fullySpreadOverLogisticalFormsFlag',
      operator: '=',
      value: false,
    });
  }

  if (logisticalFormId != null) {
    criteria.push({
      operator: 'or',
      criteria: [
        {
          fieldName: 'logisticalForm.id',
          operator: '=',
          value: logisticalFormId,
        },
        {fieldName: 'logisticalForm', operator: 'isNull'},
      ],
    });
  }

  if (stockLocationId != null) {
    criteria.push({
      fieldName: 'stockMoveLineList.fromStockLocation.id',
      operator: '=',
      value: stockLocationId,
    });
  }

  return criteria;
};

export async function searchStockMove({
  page = 0,
  companyId,
  ...criteriaParams
}: SearchStockMoveParams) {
  const {isExclusion, stockMoveIds} = criteriaParams;

  if (
    !isExclusion &&
    (!Array.isArray(stockMoveIds) || stockMoveIds.length === 0)
  ) {
    return {data: {data: []}};
  }

  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockMove',
    criteria: createSearchCriteria(criteriaParams),
    fieldKey: 'stock_stockMove',
    sortKey: 'stock_stockMove',
    page,
    provider: 'model',
    companyId,
  });
}
