/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
  getApiResponseData,
  getFirstData,
} from '@axelor/aos-mobile-core';
import StockLocation from '../types/stock-location';

const stockLocationFields = [
  'name',
  'id',
  'serialNumber',
  'stockLocationLineList',
];

const createSearchCriteria = ({
  companyId,
  searchValue,
  defaultStockLocation,
}) => {
  let criterias = [];
  criterias.push({
    fieldName: 'typeSelect',
    operator: '=',
    value: StockLocation.type.internal,
  });
  if (companyId != null) {
    criterias.push({
      fieldName: 'company.id',
      operator: '=',
      value: companyId,
    });
  }
  if (searchValue != null) {
    criterias.push({
      operator: 'or',
      criteria: [
        {
          fieldName: 'name',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'serialNumber',
          operator: 'like',
          value: searchValue,
        },
      ],
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
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.stock.db.StockLocation/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: createSearchCriteria({
              companyId: companyId,
              searchValue: searchValue,
              defaultStockLocation: defaultStockLocation,
            }),
          },
        ],
      },
      fields: stockLocationFields,
      sortBy: ['id', 'name'],
      limit: 10,
      offset: 10 * page,
    },
  });
}

export async function searchStockLocationBySerialNumber(serialNumber) {
  return axiosApiProvider
    .post({
      url: '/ws/rest/com.axelor.apps.stock.db.StockLocation/search',
      data: {
        data: {
          criteria: [
            {
              fieldName: 'serialNumber',
              operator: '=',
              value: serialNumber,
            },
          ],
        },
        fields: stockLocationFields,
        limit: 1,
        offset: 0,
      },
    })
    .then(getApiResponseData)
    .then(getFirstData);
}
