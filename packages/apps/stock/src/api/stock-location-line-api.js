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
  createStandardSearch,
  getSearchCriterias,
  getTypes,
} from '@axelor/aos-mobile-core';

const createSearchCriteria = ({productId, companyId, stockLocationId}) => {
  const StockLocation = getTypes().StockLocation;

  let criterias = [
    {
      fieldName: 'product.id',
      operator: '=',
      value: productId,
    },
  ];

  if (stockLocationId != null) {
    criterias.push({
      fieldName: 'stockLocation.id',
      operator: '=',
      value: stockLocationId,
    });
  } else {
    criterias.push({
      fieldName: 'stockLocation.typeSelect',
      operator: '=',
      value: StockLocation?.typeSelect.internal,
    });

    if (companyId != null) {
      criterias.push({
        fieldName: 'stockLocation.company.id',
        operator: '=',
        value: companyId,
      });
    }
  }

  return criterias;
};

export async function searchStockLocationLine({
  stockId,
  productId,
  companyId,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockLocationLine',
    criteria: createSearchCriteria({
      companyId: companyId,
      productId: productId,
      stockLocationId: stockId,
    }),
    fieldKey: 'stock_stockLocationLine',
    page,
    provider: 'model',
  });
}

const createAvailableProductsCriteria = ({stockLocationId, searchValue}) => {
  let criterias = [
    {
      operator: 'or',
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'product.trackingNumberConfiguration',
              operator: 'isNull',
            },
            {
              fieldName: 'stockLocation.id',
              operator: '=',
              value: stockLocationId,
            },
          ],
        },
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'product.trackingNumberConfiguration',
              operator: 'notNull',
            },
            {
              fieldName: 'detailsStockLocation.id',
              operator: '=',
              value: stockLocationId,
            },
          ],
        },
      ],
    },
    {
      fieldName: 'currentQty',
      operator: '>',
      value: 0,
    },
    getSearchCriterias('stock_stockLocationLine', searchValue),
  ];

  return criterias;
};

export async function searchAvailableProducts({
  stockLocationId,
  searchValue,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockLocationLine',
    criteria: createAvailableProductsCriteria({
      stockLocationId,
      searchValue,
    }),
    fieldKey: 'stock_availableProducts',
    sortKey: 'stock_availableProducts',
    page,
    provider: 'model',
  });
}
