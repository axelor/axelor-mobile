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

const stockCorrectionFields = [
  'statusSelect',
  'product',
  'stockLocation',
  'createdOn',
  'validationDateT',
  'trackingNumber',
  'realQty',
  'baseQty',
  'stockCorrectionReason',
];

const sortByFields = ['statusSelect', '-validationDateT', 'createdOn'];

export async function searchStockCorrection({page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.stock.db.StockCorrection/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: [],
          },
        ],
      },
      fields: stockCorrectionFields,
      sortBy: sortByFields,
      limit: 10,
      offset: 10 * page,
    },
  });
}

export async function createStockCorrection({
  productId,
  stockLocationId,
  reasonId,
  trackingNumberId,
  status,
  realQty,
}) {
  return axiosApiProvider.post({
    url: 'ws/aos/stock-correction/',
    data: {
      productId: productId,
      stockLocationId: stockLocationId,
      reasonId: reasonId,
      trackingNumberId: trackingNumberId,
      status: status,
      realQty: realQty,
    },
  });
}

export async function updateStockCorrection({
  stockCorrectionId,
  version,
  realQty,
  status,
}) {
  return axiosApiProvider.put({
    url: `/ws/aos/stock-correction/${stockCorrectionId}`,
    data: {
      version: version,
      realQty: realQty,
      status: status,
    },
  });
}
