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

import {axiosApiProvider} from '@axelor/aos-mobile-core';
import StockLocation from '../types/stock-location';

const stockLocationLineFields = [
  'id',
  'rack',
  'stockLocation',
  'product',
  'currentQty',
  'futureQty',
  'reservedQty',
  'unit',
];

export async function searchStockLocationLine({
  stockId,
  productId,
  companyId,
  page = 0,
}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.stock.db.StockLocationLine/search',
    data:
      stockId != null
        ? {
            data: {
              criteria: [
                {
                  operator: 'and',
                  criteria: [
                    {
                      fieldName: 'product.id',
                      operator: '=',
                      value: productId,
                    },
                    {
                      fieldName: 'stockLocation.id',
                      operator: '=',
                      value: stockId,
                    },
                  ],
                },
              ],
            },
            fields: stockLocationLineFields,
            limit: 10,
            offset: 10 * page,
          }
        : companyId == null
        ? {
            data: {
              criteria: [
                {
                  operator: 'and',
                  criteria: [
                    {
                      fieldName: 'product.id',
                      operator: '=',
                      value: productId,
                    },
                    {
                      fieldName: 'stockLocation.typeSelect',
                      operator: '=',
                      value: StockLocation.type.internal,
                    },
                  ],
                },
              ],
            },
            fields: stockLocationLineFields,
            limit: 10,
            offset: 10 * page,
          }
        : {
            data: {
              criteria: [
                {
                  operator: 'and',
                  criteria: [
                    {
                      fieldName: 'product.id',
                      operator: '=',
                      value: productId,
                    },
                    {
                      fieldName: 'stockLocation.typeSelect',
                      operator: '=',
                      value: StockLocation.type.internal,
                    },
                    {
                      fieldName: 'stockLocation.company.id',
                      operator: '=',
                      value: companyId,
                    },
                  ],
                },
              ],
            },
            fields: stockLocationLineFields,
            limit: 10,
            offset: 10 * page,
          },
  });
}
