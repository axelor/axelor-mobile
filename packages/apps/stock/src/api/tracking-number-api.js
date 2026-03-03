/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
  formatRequestBody,
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
  const {matchers, formattedData} = formatRequestBody(
    {
      counter: qty,
      product,
      trackingNumberSeq,
      origin,
    },
    'data',
  );

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.stock.db.TrackingNumber',
    method: 'put',
    body: {data: formattedData},
    description: 'create tracking number',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.TrackingNumber',
      id: Date.now(),
      fields: matchers,
    },
  });
}

export async function updateStockMoveLineTrackingNumber({
  stockMoveLineId,
  stockMoveLineVersion,
  trackingNumber,
}) {
  const {matchers, formattedData} = formatRequestBody(
    {
      id: stockMoveLineId,
      version: stockMoveLineVersion,
      trackingNumber,
    },
    'data',
  );

  return getActionApi().send({
    url: `/ws/rest/com.axelor.apps.stock.db.StockMoveLine/${stockMoveLineId}`,
    method: 'post',
    body: {data: formattedData},
    description: 'add tracking number on stock move line',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.StockMoveLine',
      id: stockMoveLineId,
      fields: matchers,
    },
  });
}

export async function updateTrackingNumber({id, origin, ...trackingNumber}) {
  const {$version, version, ...rest} = trackingNumber;
  const payload = {
    ...rest,
    origin,
    version: $version ?? version,
  };

  const {matchers, formattedData} = formatRequestBody(payload, 'data');

  return getActionApi().send({
    url: `/ws/rest/com.axelor.apps.stock.db.TrackingNumber/${id}`,
    method: 'post',
    body: {data: formattedData},
    description: 'Update tracking number',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.TrackingNumber',
      id: id,
      fields: matchers,
    },
  });
}
