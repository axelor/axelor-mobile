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
  getTypes,
} from '@axelor/aos-mobile-core';

const createSearchCriteria = ({searchValue, defaultStockLocation}) => {
  const StockLocation = getTypes().StockLocation;

  let criterias = [
    {
      fieldName: 'typeSelect',
      operator: '=',
      value: StockLocation?.typeSelect.internal,
    },
    getSearchCriterias('stock_stockLocation', searchValue),
  ];

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
  companyId,
  defaultStockLocation = null,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockLocation',
    companyId,
    criteria: createSearchCriteria({
      searchValue: searchValue,
      defaultStockLocation: defaultStockLocation,
    }),
    fieldKey: 'stock_stockLocation',
    sortKey: 'stock_stockLocation',
    page,
    provider: 'model',
  });
}
