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
  axiosApiProvider,
  createStandardSearch,
  getActionApi,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createSearchCriteria = (productId, searchValue) => {
  const criteria = [getSearchCriterias('stock_trackingNumber', searchValue)];

  if (productId != null) {
    criteria.push({
      fieldName: 'product.id',
      operator: '=',
      value: productId,
    });
  }

  return criteria;
};

export async function searchTrackingNumberFilter({
  productId = null,
  searchValue,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.TrackingNumber',
    criteria: createSearchCriteria(productId, searchValue),
    fieldKey: 'stock_trackingNumber',
    sortKey: 'stock_trackingNumber',
    page,
    provider: 'model',
  });
}

export async function createTrackingNumber({
  qty,
  product,
  trackingNumberSeq,
  origin,
}) {
  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.stock.db.TrackingNumber',
    method: 'put',
    body: {
      data: {
        counter: qty,
        product,
        trackingNumberSeq,
        origin,
      },
    },
    description: 'create tracking number',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.TrackingNumber',
      id: Date.now(),
      fields: {
        'data.counter': 'counter',
        'data.product': 'product',
        'data.trackingNumberSeq': 'trackingNumberSeq',
        'data.origin': 'origin',
      },
    },
  });
}

export async function updateStockMoveLineTrackingNumber({
  stockMoveLineId,
  stockMoveLineVersion,
  trackingNumber,
}) {
  return getActionApi().send({
    url: `/ws/aos/stock-move-line/${stockMoveLineId}`,
    method: 'put',
    body: {
      id: stockMoveLineId,
      version: stockMoveLineVersion,
      trackingNumber,
    },
    description: 'add tracking number on stock move line',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.StockMoveLine',
      id: stockMoveLineId,
      fields: {
        'data.trackingNumber': 'trackingNumber',
      },
    },
  });
}

export async function updateTrackingNumber({id, origin, ...trackingNumber}) {
  return axiosApiProvider.post({
    url: `/ws/rest/com.axelor.apps.stock.db.TrackingNumber/${id}`,
    data: {
      data: {
        ...trackingNumber,
        origin: origin,
        version: trackingNumber.$version ?? trackingNumber.version,
      },
    },
  });
}
