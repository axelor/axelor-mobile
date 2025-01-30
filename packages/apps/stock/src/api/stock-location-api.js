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
  getSearchCriterias,
} from '@axelor/aos-mobile-core';
import StockLocation from '../types/stock-location';

const createSearchCriteria = ({
  companyId,
  searchValue,
  defaultStockLocation,
}) => {
  let criterias = [
    {
      fieldName: 'typeSelect',
      operator: '=',
      value: StockLocation.type.internal,
    },
    getSearchCriterias('stock_stockLocation', searchValue),
  ];

  if (companyId != null) {
    criterias.push({
      fieldName: 'company.id',
      operator: '=',
      value: companyId,
    });
  }

  if (defaultStockLocation != null) {
    criterias.push({
      operator: 'or',
      criteria: [
        {
          fieldName: 'id',
          operator: '=',
          value: defaultStockLocation.id,
        },
        {
          fieldName: 'parentStockLocation.id',
          operator: '=',
          value: defaultStockLocation.id,
        },
      ],
    });
  }

  return criterias;
};

export async function searchStockLocationsFilter({
  searchValue = null,
  companyId = null,
  defaultStockLocation = null,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockLocation',
    criteria: createSearchCriteria({
      companyId: companyId,
      searchValue: searchValue,
      defaultStockLocation: defaultStockLocation,
    }),
    fieldKey: 'stock_stockLocation',
    page,
  });
}
