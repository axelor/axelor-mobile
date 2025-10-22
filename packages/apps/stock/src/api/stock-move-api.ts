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

type SearchStockMoveCriteriaParams = {
  searchValue?: string;
  stockMoveIds?: number[];
  excludeStockMoveIds?: number[];
  typeSelectList?: number[];
  partnerId?: number;
  statusList?: number[];
};

type SearchStockMoveParams = SearchStockMoveCriteriaParams & {
  page?: number;
  companyId?: number;
};

const buildTypeCriteria = (typeSelectList: number[]): Criteria => {
  if (typeSelectList.length === 1) {
    return {
      fieldName: 'typeSelect',
      operator: '=',
      value: typeSelectList[0],
    };
  }

  return {
    operator: 'or',
    criteria: typeSelectList.map(type => ({
      fieldName: 'typeSelect',
      operator: '=',
      value: type,
    })),
  };
};

const createSearchCriteria = ({
  searchValue,
  stockMoveIds,
  excludeStockMoveIds,
  typeSelectList,
  partnerId,
  statusList,
}: SearchStockMoveCriteriaParams): Criteria[] => {
  const criteria: Criteria[] = [
    getSearchCriterias('stock_stockMove', searchValue),
  ];

  if (Array.isArray(stockMoveIds) && stockMoveIds.length > 0) {
    criteria.push({
      fieldName: 'id',
      operator: 'in',
      value: stockMoveIds,
    });
  }

  if (Array.isArray(typeSelectList) && typeSelectList.length > 0) {
    criteria.push(buildTypeCriteria(typeSelectList));
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
        value: status,
      })),
    });
  }

  if (Array.isArray(excludeStockMoveIds) && excludeStockMoveIds.length > 0) {
    criteria.push({
      operator: 'not',
      criteria: [
        {
          fieldName: 'id',
          operator: 'in',
          value: excludeStockMoveIds,
        },
      ],
    });
  }

  return criteria;
};

export async function searchStockMove({
  page = 0,
  companyId,
  ...rest
}: SearchStockMoveParams) {
  const criteriaParams: SearchStockMoveCriteriaParams = rest;
  const {stockMoveIds, typeSelectList, partnerId, statusList} = criteriaParams;

  const hasInclusionFilter =
    (Array.isArray(stockMoveIds) && stockMoveIds.length > 0) ||
    (Array.isArray(typeSelectList) && typeSelectList.length > 0) ||
    partnerId != null ||
    (Array.isArray(statusList) && statusList.length > 0);

  if (!hasInclusionFilter) {
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
