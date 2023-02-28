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

import {axiosApiProvider, getObjectFields} from '@axelor/aos-mobile-core';

export async function searchTrackingNumberFilter({
  productId,
  searchValue,
  page = 0,
}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.stock.db.TrackingNumber/search',
    data: {
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
                operator: 'or',
                criteria: [
                  {
                    fieldName: 'trackingNumberSeq',
                    operator: 'like',
                    value: searchValue,
                  },
                  {
                    fieldName: 'serialNumber',
                    operator: 'like',
                    value: searchValue,
                  },
                ],
              },
            ],
          },
        ],
      },
      fields: getObjectFields('stock_trackingNumber'),
      sortBy: ['trackingNumberSeq'],
      limit: 10,
      offset: 10 * page,
    },
  });
}

export async function createTrackingNumber({qty, product, trackingNumberSeq}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.stock.db.TrackingNumber',
    data: {
      data: {
        counter: qty,
        product: product,
        trackingNumberSeq: trackingNumberSeq,
      },
    },
  });
}

export async function updateStockMoveLineTrackingNumber({
  stockMoveLineId,
  stockMoveLineVersion,
  trackingNumber,
}) {
  return axiosApiProvider.post({
    url: `/ws/rest/com.axelor.apps.stock.db.StockMoveLine/${stockMoveLineId}`,
    data: {
      data: {
        id: stockMoveLineId,
        version: stockMoveLineVersion,
        trackingNumber: trackingNumber,
      },
    },
  });
}
