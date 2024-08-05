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
  createStandardFetch,
  createStandardSearch,
  getActionApi,
} from '@axelor/aos-mobile-core';

export async function searchStockCorrection({page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockCorrection',
    criteria: [],
    fieldKey: 'stock_stockCorrection',
    sortKey: 'stock_stockCorrection',
    page,
    provider: 'model',
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
