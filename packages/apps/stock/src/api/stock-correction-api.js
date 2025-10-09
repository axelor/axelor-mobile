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
  createStandardFetch,
  createStandardSearch,
  formatRequestBody,
  getActionApi,
} from '@axelor/aos-mobile-core';

const createSearchStockCorrectionCriteria = (
  stockLocationId,
  productId,
  statusList,
) => {
  const criteria = [];

  if (stockLocationId != null) {
    criteria.push({
      fieldName: 'stockLocation.id',
      operator: '=',
      value: stockLocationId,
    });
  }

  if (productId != null) {
    criteria.push({
      fieldName: 'product.id',
      operator: '=',
      value: productId,
    });
  }

  if (Array.isArray(statusList) && statusList.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: statusList.map(status => ({
        fieldName: 'statusSelect',
        operator: '=',
        value: status.key,
      })),
    });
  }

  return criteria;
};

export async function searchStockCorrection({
  stockLocationId,
  productId,
  statusList,
  page = 0,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockCorrection',
    criteria: createSearchStockCorrectionCriteria(
      stockLocationId,
      productId,
      statusList,
    ),
    fieldKey: 'stock_stockCorrection',
    sortKey: 'stock_stockCorrection',
    page,
    provider: 'model',
    filter: filterDomain,
  });
}

export async function fetchStockCorrection({id}) {
  return createStandardFetch({
    model: 'com.axelor.apps.stock.db.StockCorrection',
    id: id,
    fieldKey: 'stock_stockCorrection',
    provider: 'model',
  });
}

export async function createStockCorrection({
  productId,
  stockLocationId,
  reasonId,
  trackingNumberId,
  status,
  realQty,
  comments,
}) {
  return getActionApi().send({
    url: 'ws/aos/stock-correction/',
    method: 'post',
    body: {
      productId,
      stockLocationId,
      reasonId,
      trackingNumberId,
      status,
      realQty,
      comments,
    },
    description: 'create stock correction',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.StockCorrection',
      id: Date.now(),
      fields: {
        productId: 'product.id',
        stockLocationId: 'stockLocation.id',
        reasonId: 'reason.id',
        trackingNumberId: 'trackingNumber.id',
        status: 'statusSelect',
        realQty,
        comments,
      },
    },
  });
}

export async function updateStockCorrection({
  stockCorrectionId,
  version,
  realQty,
  status,
  reasonId,
  comments,
}) {
  return getActionApi().send({
    url: `/ws/aos/stock-correction/${stockCorrectionId}`,
    method: 'put',
    body: {
      version,
      realQty,
      status,
      reasonId,
      comments,
    },
    description: 'update stock correction',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.StockCorrection',
      id: stockCorrectionId,
      fields: {
        reasonId: 'reason.id',
        status: 'statusSelect',
        realQty,
        comments,
      },
    },
  });
}

export async function updateStockCorrectionTrackingNumber({
  stockCorrectionId,
  stockCorrectionVersion,
  trackingNumber,
}) {
  const {matchers, formattedData} = formatRequestBody(
    {
      id: stockCorrectionId,
      version: stockCorrectionVersion,
      trackingNumber,
    },
    'data',
  );

  return getActionApi().send({
    url: `/ws/rest/com.axelor.apps.stock.db.StockCorrection/${stockCorrectionId}`,
    method: 'post',
    body: {data: formattedData},
    description: 'update stock correction tracking number',
    matchers: {
      modelName: 'com.axelor.apps.stock.db.StockCorrection',
      id: stockCorrectionId,
      fields: matchers,
    },
  });
}
